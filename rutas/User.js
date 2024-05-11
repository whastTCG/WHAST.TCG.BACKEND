const express = require("express");
const router = express.Router();
const UserController = require("../controladores/User");

const check = require("../middelware/auth");



//metodos get
router.get("/prueba", UserController.pruebaUsuario);

//metodos post
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/recuperar-pass-token", UserController.recuperarContrasenaToken);
router.post("/update-contrasena-token", UserController.updatearContrasenaToken);
//metodos get
router.get("/profile/:id", check.auth, UserController.profile);
router.get("/clean-cookies", UserController.cleanCookies);
router.get("/obtener-cookie/",  UserController.obtenerCookie);
//metodos put
router.put("/update", check.auth, UserController.update);
router.put("/update-password", check.auth, UserController.updatePassword);
router.put("/recuperar-password", UserController.recuperarContraseña);
//exportar router

module.exports = router;

