import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del server', 8080)
    .option('--persist <mode>', 'Modo de persistencia', 'mongodb')
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
    .option('-u <user>', 'Usuario que va utilizar la app', "No se declaro ningun usuario")
program.parse() //Parsea los comandos y valida si son correctos.


// TODO: REVISAR -- todo ok

const enviroment = program.opts().mode;
console.log("Modo Opt: ", program.opts().mode);
console.log("Modo Opt: ", program.opts().persist);

// const enviroment = 'dev'


// dotenv.config()
dotenv.config({
    path: enviroment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
})



export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence: program.opts().persist,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    environment: enviroment,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD
}

/* *****************npqs wbyh aiwu xarm******************* */


// console.log("Options: ", program.opts());
// console.log("Modo Opt: ", program.opts().mode);
// console.log("Puerto Opt: ", program.opts().p);

//console.log("Argumentos Opt: ", program.args);


// 2do - Listeners
/* process.on("exit", code => {
    console.log("Este codigo se ejecuta antes de salir del proceso.");
    console.log("Codigo de salida del proceso: " + code);
});

process.on("uncaughtException", exception => {
    console.log("Esta exception no fue capturada, o controlada.");
    console.log(`Exception no capturada: ${exception}`)
});

process.on("message", message => {
    console.log("Este codigo se ejecutará cuando reciba un mensaje de otro proceso.");
    console.log(`Mensaje recibido: ${message}`);
}); */