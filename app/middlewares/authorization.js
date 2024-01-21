import  JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
import {usuarios} from "../controllers/authentication.controllers.js";

dotenv.config();


function soloAdmin(req,res,next){
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return res.redirect("/")
}


function soloPublico(req,res,next){
    const logueado = revisarCookie(req);
    if(!logueado) return next();
    return res.redirect("/admin")
}


function revisarCookie(req){
    try
    {const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startswith("jwt=")).slice(4);
 const decodificada = JsonWebToken.verify(cookieJWT,process.env. JWT_SECRET )
 console.log(decodificada)
 const usuario_revisar = usuarios.find(usuario => usuario.user === decodificada.user);
 
 console.log(usuario_revisar)
 
 if(!usuario_revisar){
        return false
     }
     return true;
    }
    catch{
        return false;
    }
}





export const methods= {
    soloAdmin,
    soloPublico,
}