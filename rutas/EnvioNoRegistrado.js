const express = require("express");

const router = express.Router();

const envioNoRegistrado = require('../controladores/EnvioNoRegistrado');


// ruta de prueba
router.get("/prueba", envioNoRegistrado.prueba);
//metodo put

//metodos post
router.post("/crear-datos-envio", envioNoRegistrado.crearDatosEnvio);


module.exports = router;