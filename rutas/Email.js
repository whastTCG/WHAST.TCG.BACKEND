const express = require("express");

const router = express.Router();

const email = require('../controladores/Email');


// ruta de prueba
router.get("/prueba-email", email.pruebaEmail);
//metodo put
router.put("/verificar-usuario",  email.verificarUsuario);
router.put("/reenviar-email",  email.reenviarEMail);



module.exports = router;