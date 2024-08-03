import { info } from "console";
import {EventEmitter} from "events";

const emitter = new EventEmitter();
emitter.addListener("hello", (name)=> {
    info(`Hello, ${name}`)
})

emitter.on("hello", (name)=> {
    info(`Hello, ${name}`)
})

emitter.emit("hello", "Reff")