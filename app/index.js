import  express  from "express";
import cookieParser from "cookie-parser";
import { methods as authentication } from "./controllers/authentication.controllers.js";
import { methods as authorazation } from "./middlewares/authorization.js";
import path from "path"; 

//SERVIDOR 
const app= express();
app.set("port",5500);
app.listen(app.get("port"));
console.log("servidor en puerto", app.get("port"));
import { methods as authentication } from "./controllers/authentication.controllers.js";

//Configuración
app.use(express.json());
app.use(cookieParser())



//RUTAS
app.get("/", (req, res) => authorazation.soloPublico(req, res, () => res.sendFile(__dirname + "/pages/login.html")));
app.get("/register", (req, res) => authorazation.soloPublico(req, res, () => res.sendFile(__dirname + "/pages/register.html")));
app.get("/admin", (req, res) => authorazation.soloAdmin(req, res, () => res.sendFile(__dirname + "/pages/admin/admin.html")));
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);
