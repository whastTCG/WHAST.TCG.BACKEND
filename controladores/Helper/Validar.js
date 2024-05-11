
const validator = require("validator");
const { validate, clean, format, getCheckDigit } = require('rut.js');
const { param } = require("../../rutas/Carta");

function isValidEmail(mail) { 
    return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail); 
  }
const validarUser = (parametros) => {




    let validarNombre = !validator.isEmpty(parametros.name) && validator.isLength(parametros.name, { min: 2, max: 20 });
    let validarApellido = !validator.isEmpty(parametros.surname) && validator.isLength(parametros.surname, { min: 2, max: 20 });

    let validarPaswword = !validator.isEmpty(parametros.password) && validator.isLength(parametros.password, {min:5, max:25});

    if (validarNombre == false || validarPaswword == false || validarApellido == false )  {
        throw new Error("no se ha validado la informacion")
    }
}

const valDatosUpdate = (parametros) =>{
    let validarTelefono = !validator.isEmpty(parametros.telefono) &&  validator.isLength(parametros.telefono, {min:9, max :13});
    let validarRut = validate(parametros.rut);
    let validarDireccion = !validator.isEmpty(parametros.direccion) && validator.isLength(parametros.direccion, {min:2, max:30});
    let validarCiudad = !validator.isEmpty(parametros.ciudad) && validator.isLength(parametros.ciudad, {min:2, max:30});
    let validarComuna = !validator.isEmpty(parametros.comuna) && validator.isLength(parametros.comuna, {min:2, max:30});
    let validarRegion = !validator.isEmpty(parametros.region) && validator.isLength(parametros.region, {min:2, max:30});
    let validarNombre = !validator.isEmpty(parametros.nombreCompleto) && validator.isLength(parametros.nombreCompleto, {min:2, max:50});
    
    //console.log(validarRut)
    if (validarTelefono == false || validarRut == false || validarDireccion== false || validarCiudad == false || validarComuna == false || validarRegion == false || validarNombre == false) {
        throw new Error("no se ha validado la informacion")
    }
}

const valDatosEnvioNoRegistrado = (parametros) =>{
    let validarTelefono = !validator.isEmpty(parametros.telefono) &&  validator.isLength(parametros.telefono, {min:9, max :13});
    let validarRut = validate(parametros.rut);
    let validarDireccion = !validator.isEmpty(parametros.direccion) && validator.isLength(parametros.direccion, {min:2, max:30});
    let validarCiudad = !validator.isEmpty(parametros.ciudad) && validator.isLength(parametros.ciudad, {min:2, max:30});
    let validarComuna = !validator.isEmpty(parametros.comuna) && validator.isLength(parametros.comuna, {min:2, max:30});
    let validarRegion = !validator.isEmpty(parametros.region) && validator.isLength(parametros.region, {min:2, max:30});
    let validarNombre = !validator.isEmpty(parametros.nombreCompleto) && validator.isLength(parametros.nombreCompleto, {min:2, max:50});
    let validarEmail = !validator.isEmpty(parametros.email) && validator.isEmail(parametros.email);

    //console.log(validarRut)
    if (validarEmail == false || validarTelefono == false || validarRut == false || validarDireccion== false || validarCiudad == false || validarComuna == false || validarRegion == false || validarNombre == false) {
        throw new Error("no se ha validado la informacion")
    }
}

const validarPassowrd = (password) =>{
    let validarPaswword = !validator.isEmpty(password) && validator.isLength(password, {min:5, max:25});

    if (validarPaswword == false) {
        throw new Error("no se ha validado la informacion");
    }
}

//verifica si el valor ingresado tiene el formato de el id unico proporcionado por mongodb
const isValidObjectId = (value) => {
    return /^[0-9a-fA-F]{24}$/.test(value);
  };

module.exports={
    validarUser,
    isValidEmail,
    valDatosUpdate,
    validarPassowrd,
    valDatosEnvioNoRegistrado,
    isValidObjectId
}