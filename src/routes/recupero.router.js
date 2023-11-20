import { Router } from "express";
const router= Router();
import userModel from "../services/dao/db/models/user.js";
import { createHash } from "../utils.js";

//Inicio de recupero 
router.get('/clave/mail-de-recupero', (req, res) => {

    res.render('recupero');

});


//chequear existencia de usuario
router.post('/cambio-de-clave', async (req, res) => {
    
    const {mailDeRecupero} = req.body;

    try {
        const user = await userModel.findOne({email: mailDeRecupero});
        console.log(user);

        if (user) {
            return res.status(200).send({ status: 'success' });

        }else {
            return res.status(404).send({ status: 'error', message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', message: 'Error en el servidor' });
    }
    
});



router.post('/clave-exitosa', async (req, res) => {
    const {userEmail,passwordNueva,passwordConfirmacion} = req.body;

    if (passwordNueva === passwordConfirmacion){

        const newPassword = createHash(passwordConfirmacion) 

        const user = await userModel.findOne({email: userEmail});

        console.log('----------' + user.password +  '---------' + newPassword + '----------');

        

        if (user.password !== newPassword) {
            const result = await userModel.updateOne(
                { email: userEmail }, 
                { $set: { password: newPassword } }
            );

            return res.status(200).send({ status: 'success' });
        }else{
            return res.status(202).send({ status: 'verificar' }); 
        }     
           
    }

})












router.get('/:resultLink', async (req, res) => {

     const link = req.params.resultLink
     const fechaExpiracion = new Date(link);

     console.log(link);
    
     if (fechaExpiracion > new Date()) {

      res.render('credenciales-nuevas'); 

    } else {
      res.status(404).send('Enlace no válido o expiradoo.');
    }
    
});









//validacion de link 

/* router.get('/fechaExpiracion', (req, res) => {
    const fechaExpiracion = new Date(req.params);
    const enlace = generarEnlaceConExpiracion();
    
    if (fechaExpiracion > new Date()) {

    //  res.render('credenciales-nuevas'); ESTO SE RENDERIZA EN EL MAIL RECIEN
      res.status(200).send('Acceso correcto');


    } else {
      res.status(404).send('Enlace no válido o expiradoo.');
    }
}); */









export default router;




/* export const userRegister = async (req, res) => {
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
} */