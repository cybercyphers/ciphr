"use strict";

//Ready to brainstorm....

/*

This package's function is to help developers log info and debug their code on runtime and also use simple tools that dont necessarily need rebuild.


*/







import fs from "node:fs";
import path,{ dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
    sleep,
    UUID as randomuuid,
    ytvid
} from "../functions/systemFuncs.js";

 import { Err } from "../functions/Error.js";
import { _dirname } from "../functions/ESMFunc.js";



//console.log(JSON.stringify(process.env));

//every server listening on a port is defined...
var PORT = process.env.SERVER_PORT;
//console.log(`\n\x1b[1;32mstarting server on port ${PORT} \x1b[0m`);


const defaultTools = {
    randomuuid,
    ytvid
}


export  {
    defaultTools as default
};

//EOF
