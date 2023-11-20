import userModel from '../services/dao/db/models/user.js';
import { isValidPassword , createHash } from '../utils.js';
import SessionDto from '../services/dto/session.dto.js';
import { devLogger } from '../config/logger_BASE.js';


export const userRegister = async (req, res) => {
    const { first_name, last_name, email, age, password, role, cart } = req.body;
    req.logger = devLogger;  

    const exists = await userModel.findOne({ email })
    if (exists) {
        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
    }
    const user = {
        first_name,
        last_name,
        email,
        role,
        age,
        password: createHash(password),
        cart
    }
    if (role === "") {
        user.role = "user";
    }
    const result = await userModel.create(user);
    req.logger.info('exito en userRegister');
    res.send({ status: "success", message: "Usuario creado con exito con ID: " + result.id })
}




export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })//Ya que el password no está hasheado, podemos buscarlo directamente
    req.logger = devLogger;  
    req.logger.info(email , password);

    if (!user) {
      return res.status(401).send({ status: "error", error: "Incorrect credentials" })
    };

    if(!isValidPassword(user,password)) {
        return res.status(401).send({ status: "error", error: "Incorrect credentials" });
    }

    // damos de alta la session
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role,
        cart: user._id
    }
    req.logger.info('exito en userLogin');
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
}




export const userSession = async (req, res) => {

    if (req.session && req.session.user) {

        const sessionDto = new SessionDto (req.session.user);

        res.send(`Datos de la sesión actual: ${JSON.stringify(sessionDto.role)}`);
      } else {
        res.status(401).send('No hay una sesión activa');
        req.logger.error('Esto es un error en userSession'); 
      }
}


export const confirmRole = async (req, res, next) => {
    if (req.session && req.session.user) {
      const sessionDto = new SessionDto(req.session.user);
      const result = JSON.stringify(sessionDto.role);
  
      if (result !== "admin") {
        next();
      } else {
        res.status(403).send('No tienes permiso para acceder a esta ruta');
      }
    } else {
      res.status(401).send('No tenes acceso a este servicio');
      req.logger.error('Esto es un error en confirmRole'); 
    }
  };






