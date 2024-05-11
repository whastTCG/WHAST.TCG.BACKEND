const express = require("express");
const router = express.Router();
const ventaController = require("../controladores/Venta");
const check = require("../middelware/auth");
//metodos get
router.get("/prueba", ventaController.pruebaVenta);
router.get("/buscar-venta", ventaController.buscarVenta);
router.get("/buscar-ultima-venta", ventaController.buscarUltimaVenta);
router.get("/listar-historial/pedidos", check.auth, ventaController.listarVentas  );
// //metodos post
router.post("/crear-venta", ventaController.crearVenta);
// //metodos get
// router.get("/profile/:id", check.auth, UserController.profile);
// router.get("/clean-cookies", UserController.cleanCookies);
// router.get("/obtener-cookie/",  UserController.obtenerCookie);
// //metodos put
// router.put("/update", check.auth, UserController.update);
// router.put("/update-password", check.auth, UserController.updatePassword);
// router.put("/recuperar-password", UserController.recuperarContraseña);
// //exportar router

module.exports = router;

