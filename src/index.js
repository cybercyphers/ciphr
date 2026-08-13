//Ready to brainstorm....

/*

this package function is to help developers log info and debug their code on runtime


*/







import fs from "node:fs";
import path,{ join,dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
    sleep,
    UUID as randomuuid
} from "./functions/systemFuncs.js";
const _dirname = dirname(fileURLToPath(import.meta.url));

//since in  type : module, __dirname  is not defined, we define it  here to be accessible without manually defining path.join(__dirname); to help developers. 

const __dirname = dirname(fileURLToPath(import.meta.url));
 

//console.log(JSON.stringify(process.env));

//every server listening on a port is defined...
var PORT = process.env.SERVER_PORT;
//console.log(`\n\x1b[1;32mstarting server on port ${PORT} \x1b[0m`);





export {
    __dirname,
   randomuuid
}

//EOF
