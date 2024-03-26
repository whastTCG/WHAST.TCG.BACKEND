const express = require("express");
const router = express.Router();
const UserController = require("../controladores/User");
const multer = require("multer");
const check = require("../middelware/auth");



//metodos get
router.get("/prueba", UserController.pruebaUsuario);

//metodos post
router.post("/login", UserController.login);
router.post("/register", UserController.register);
//metodos get
router.get("/profile/:id", check.auth, UserController.profile);
router.get("/clean-cookies", UserController.cleanCookies);
router.get("/obtener-cookie/",  UserController.obtenerCookie);
//metodos put
router.put("/update", check.auth, UserController.update);
router.put("/update-password", check.auth, UserController.updatePassword);
//exportar router

module.exports = router;

