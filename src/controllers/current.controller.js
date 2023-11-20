import userModel from '../services/dao/db/models/user.js';
import SessionDto from '../services/dto/session.dto.js';




export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })//Ya que el password no está hasheado, podemos buscarlo directamente

    console.log(email , password);

    if (!user) return res.status(401).send({ status: "error", error: "Incorrect credentials" })

    if(!isValidPassword(user,password)) {
        return res.status(401).send({ status: "error", error: "Incorrect credentials" });
    }

   const sessionInfo = new SessionDto (user);

    res.send({ status: "success", payload: sessionInfo, message: "¡Primer logueo realizado! :)" });
}