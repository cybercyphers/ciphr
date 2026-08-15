/*
for function that are needed daily in the system.
these functions are system functions..
*/



import fs from "node:fs";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import path,{ join,dirname } from "node:path";
const __dirname = dirname(fileURLToPath(import.meta.url));



//time delay for important information or functions that need some time instead of async-await..
const sleep = (milliseconds)=>{
     const futureTime = Date.now()+milliseconds;
  while(Date.now() < futureTime){}
};




//random uuid fingerprinting

function UUID() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
};

/*
we promisify execFile to make it async and avoid errors if the media is very large which will take a lot of time to fetch links...
*/
const execsync = promisify(execFile);



async function ytvid(link=null,options ={},px="22/best"){
    
    if(!link){
        throw new Error("request url was now given")
    };
    //link validation, pls ensure you not trying to hack into any system here.Use the right link...
    const linkTest = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.*$/i;
    
  if(linkTest.test(link) !== true){
        throw new Error("invalid url given");
    };
    
    try{
    
    /*
    set permission to the binaries to avoid unauthorized errors from the bunaries folder
*/
var binary_755_permission_set = fs.readdirSync(path.join(__dirname,"../binaries/"),{ recursive:true }); 
for(const bin of binary_755_permission_set){
    
 const Stats = fs.statSync(path.join(__dirname,`../binaries/${bin}`))
 //permission checking before decision
   var binary_permissions = (Stats.mode & 0o755).toString(8);
    
     if(binary_permissions !== 755){
         /*only execute it the permission is not set to 755 wich allows read, write and execution*/
fs.chmodSync(path.join(__dirname,`../binaries/${bin}`),0o755);
     };
};
 
    
   if(!fs.existsSync(path.join(__dirname,"../binaries/ytdlp")) || !fs.existsSync(path.join(__dirname,"../binaries/ffmpeg")) || !fs.existsSync(path.join(__dirname,"../binaries/ffprobe"))){
       
       console.trace("\n\x1b[31msome libraries have been deleted manually, while some binaries can be recreated automatically, some will need  re-installation to be able to function...\n");
       try{
       const { stderr,stout } = await execsync("/bin/sh",
        [
           /* run bash command safely to install ytvid lib if not available but makes sure ffmepg and ffprobe is is available to avoid re-install
           */
           "-c","curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /home/container/binaries/ytdlp && chmod a+rx /home/container/binaries/ytdlp && /home/container/binaries/ytdlp -U"
       ],{ shell : true });
           console.log("\n\x1b[1;38mplease wait...\n\x1b[0m");
           await new Promise(resolve=>setTimeout(resolve,3000))
       }catch(err){
        console.log(`\x1b[1;31mFailed to get data with request, ${JSON.stringify({ requestUrl : link }) }\x1b[0m`,err);
         return;
       };
   };
       
    
    /*
    other alternative if user choose for double link. eg.one stream without audio and other with audio.
    */
    
    
    if(options.dual === true){
        /* 
        same command line if dualsplit is toggled false but one has sound only and the other has audio only but both in very high pixels than the pre-merged
        */
        const { stdout,stderr } = await execsync(path.join(__dirname,"../binaries/ytdlp"),[
      "--user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
 "-f",
      `bestvideo+bestaudio/best`,
      "-g",
      `${String(link)}`
  ]);     
    var data = stdout.split('\n');
        
return { video_only_hp:`${data[0]}\n`,
                audio_only_hp : `${data[1]}\n`    
                   };
     
    }
    
     /*
 @param {object} options - the options in which all other objs are stored
 @param {object} options.json -respond with video information only.
*/
    
    else if(options.json === true){
    
    const { stdout,stderr } = await execsync(path.join(__dirname,"../binaries/ytdlp"),[
      "--user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
 "--skip-download",
      "--dump-json",
      `${String(link)}`
  ]);
       return { json:stdout };
        
    } 
    
    /*
@param {object} options.mergeUrl - give stream url as one
*/  
    else if(options.merge === true){
    
    //start fetch
  const { stdout,stderr } = await execsync(path.join(__dirname,"../binaries/ytdlp"),[
      "--user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
 "-f",
      `${String(px)}`,
      "-g",
      `${String(link)}`
  ]);
    return { merged_video:stdout };  
    } 
    
   else{
       
   
  const { stdout,stderr } = await execsync(path.join(__dirname,"../binaries/ytdlp"),[
      "--user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
 "-f",
"bv*[ext=mp4]+ba[ext=m4a]/bv+ba",
      "--merge-output-format",
      "mp4",
      "--js-runtimes",
      `node:${process.execPath}`,
      "-o", path.join(__dirname,".")+"/%(resolution)s.%(ext)s",
      `${String(link)}`
  ]);
     return { data : `saved merged format ${{link}} to home directory successfully...`} 
       
};
    }catch(err){
    return Err("an error occured executing command ytvid. If error persist, please report at https://github.com/cybercyphers/decifer/issues ")
}
   };      

//ytvid("https://youtube.com/shorts/Boep7EPKyas?si=ObS_GUDjtZhOser-");

//ytvid("https://vt.tiktok.com/ZS4Kc2jHg/");

export {
    sleep,
UUID,
  ytvid  
}
