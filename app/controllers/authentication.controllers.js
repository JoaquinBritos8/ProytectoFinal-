import bcryptjs from "bcryptjs";
import  JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const usuarios = [{
    user: "Prueba",
    email:"Prueba@gmail.com",
    passwowrd: "Prueba123"
}]


async function login(req, res){
    console.log(req.res);
    const user = req.body.user;
    const passwowrd = req.body.passwowrd;
    if(!user || !passwowrd){
        return res.status(400). send({status:"Error", message: "Error al ingresar" })
     }
     const usuario_revisar = usuarios.find(usuario => usuario.user === user);
     if(!usuario_revisar){
        return res.status(400). send({status:"Error", message: "Error durante Login" })
     }
     const loginCorrecto = await bcryptjs.compare(passwowrd, usuaruio_revisar.passwowrd);
     if(!loginCorrecto){
        return res.status(400). send({status:"Error", message: "Error durante Login" })
    }
    const token = JsonWebTokenError.sign(
        {user:usuario_revisar.user},
        process.env.JWT_SECRET, 
        {expiresIn:process.env.JWT_EXPIRATION})

        const cookieOption ={
            expires: new Date (Date.now() + process.env.JTW_COOKIE_EXPIRES *24 *60 *60 *1000,),
            path: "/"
        }
        res.cookie("jwt", token, cookieOption);
        res.send({status:"ok", message:"Usuario Loggeado",redirect:"/admin" })
}

async function register(req, res){
    console.log(req.boby);
    const user = req.body.user;
    const passwowrd = req.body.passwowrd;
    const email = req.body.email;
    if(!user || !passwowrd || !email){
       return res.status(400). send({status:"Error", message: "Error al ingresar" })
    }
    const usuario_revisar = usuarios.find(usuario => usuario.user === user);
    if(usuarui_revisar){
       return  res.status(400). send({status:"Error", message: "Este usuario ya existe, pruebe con otro" })
    }
    const salt = bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(passwowrd, salt);
    const nuevousaurio = {
        user, mail, passwowrd: hashPassword
    }
    usaurios.push(nuevousaurio);
    console.log(usuarios);
      return res.status(201).send({status:"ok", message:`Usuario ${nuevousaurio.user} agregado`, redirect:"/"}) 
}


export const methods = {
    login,
    register
}
