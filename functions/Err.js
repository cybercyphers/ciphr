
/*
@param { parameter | null | undefined } errMessage - message to be returned or logged to console it an error occures.

@return { string } the message that is safe to be logged
*/

var fallback_message = "wowdi, you caught a stubborn bug, report at https://github.com/cybercyphers/decifer/issues for it to be dealt with...";

const Err = (errMessage) =>{
 const secureErr =  errMessage ??  fallback_message;
  
    console.log(`\x1b[31m${String(secureErr) || JSON.stringify(secureErr) || secureErr}\x1b[0m`);
}










export default Err;
