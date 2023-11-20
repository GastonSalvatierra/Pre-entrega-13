
import config from "../config/config.js";
import MongoSingleton from '../config/mongodb-singleton.js'


let cartService;
let messageService;
let productService;


async function initializeMongoService() {
    console.log("Iniciando servicio para MongoDB");
    try {
        // conectamos Mongo
        await MongoSingleton.getIntance()

        // Creamos las instancias de las Clases de DAO de Mongo
        const { default: CartServiceMongo } = await import('./dao/db/carts.services.js');
        cartService = new CartServiceMongo();
        console.log("Servicio de cart cargado");
        

        const { default: MessageServiceMongo } = await import('./dao/db/message.services.js');
        messageService = new MessageServiceMongo();
        console.log("Servicio de message cargado");
        

        const { default: ProductServiceMongo } = await import('./dao/db/products.services.js');
        productService = new ProductServiceMongo();
        console.log("Servicio de products cargado");
        


    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); // Salir con código de error
    }
}


switch (config.persistence) {
    case 'mongodb':
        initializeMongoService();
        break;

    case 'files':
        //LOGICA PARA CREAR INSTANCIA DE FILES EN CASO DE UTILIZAR ESTE DAO
        console.log("LOGICA PARA FILES");
        break;

    case 'sql':
        // SQL

        break;

    default:
        console.error("Persistencia no válida en la configuración:", config.persistence);
        process.exit(1); // Salir con código de error
}


export{cartService, messageService, productService}