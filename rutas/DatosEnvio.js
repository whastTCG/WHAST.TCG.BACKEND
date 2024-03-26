const express = require("express");
const router = express.Router();
const DatosEnvioController = require("../controladores/DatosEnvio");
const check = require("../middelware/auth");



//metodos get
router.get("/prueba", check.auth, DatosEnvioController.prueba);
router.get("/list-direccion-envios", check.auth, DatosEnvioController.listDireccionEnvio);
router.post("/crear-datos-envio", check.auth, DatosEnvioController.crearDatosEnvio);
router.put("/update", check.auth,DatosEnvioController.modificarDatos);
router.delete("/borrar-datos-envio", check.auth,DatosEnvioController.borrarPorId);


module.exports = router;

