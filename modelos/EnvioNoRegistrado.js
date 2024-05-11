const { Schema, model } = require("mongoose");

const EnvioNoRegistradoSchema = new Schema({

    venta: {
        type: Schema.Types.ObjectId,
        ref: "venta",
        required: true
    },

    direccion: {
        type: String,
        default: "NA"
    },
    rut: {
        type: String,
        default: "NA"
    },
    nombreCompleto: {
        type: String,
        default: "NA"
    },
    ciudad: {
        type: String,
        default: "NA"
    },

    region: {
        type: String,
        default: "NA"
    },
    comuna: {
        type: String,
        default: "NA"
    },
    pais: {
        type: String,
        default: "Chile"
    },


    telefono: {
        type: String,
        default: "000000000"
    },
    codigoPostal: {
        type: String,
        default: "00000000"
    },

    entregaPresencial: {
        type: Boolean,
        default: false
    },
    casillaCorreo: {
        type: String,
        required: true,
        default: "Starken"
    },

    direccionSucursal: {
        type: String,
        required: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        default: ""
    }


})

module.exports = model("EnvioNoRegistrado", EnvioNoRegistradoSchema, "envioNoRegistrado");