

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/*
@param { parameter | null | undefined } errMessage - message to be returned or logged to console it an error occures.

@return { string } the message that is safe to be logged
*/

var fallback_message = "wowdi, you caught a stubborn bug, report at https://github.com/cybercyphers/decifer/issues for it to be dealt with...";

const Err = (errMessage) =>{
 var secureErr =  errMessage ?? fallback_message;

 var secureErrValidation = typeof secureErr === 'object' ? JSON.stringify(secureErr) : String(secureErr);
  
    console.trace(`\n\x1b[31m${secureErrValidation}\n\x1b[0m`);
}












export { Err };
