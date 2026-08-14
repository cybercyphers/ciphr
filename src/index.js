//Ready to brainstorm....

/*

this package function is to help developers log info and debug their code on runtime


*/







import fs from "node:fs";
import path,{ join,dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
    sleep,
    UUID as randomuuid,
    ytvid
} from "../functions/systemFuncs.js";
const __dirname = dirname(fileURLToPath(import.meta.url));



/*since in  type : module, __dirname  is not defined, we define it  here to be accessible without manually defining path.join(__dirname); to help developers. 



the placeholder should always be "import.meta.url" nothing else in order to resolve to the user's path directly instead of cyphr path...
*/


const __Dirname = (import_meta_url)=>{
    return dirname(fileURLToPath(import_meta_url));
};

 

//console.log(JSON.stringify(process.env));

//every server listening on a port is defined...
var PORT = process.env.SERVER_PORT;
//console.log(`\n\x1b[1;32mstarting server on port ${PORT} \x1b[0m`);


const defaultTools = {
    randomuuid,
    ytvid
}


export  {
    defaultTools as default,
    __Dirname
};

//EOF
