const { Schema, model } = require("mongoose");
//para ejecutar metodo paginado
const mongoosePaginate = require("mongoose-paginate-v2");

const VentaSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  datosEnvioSeleccionados: { // Nuevo campo para almacenar el ID de los datos de envío seleccionados
    type: Schema.Types.ObjectId,
    ref: "DatosEnvio"
  },
  productos: [
    {
      carta: {
        type: Schema.Types.ObjectId,
        ref: "cartas",
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1
      },
      precio: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  fechaEmision: {
    type: Date,
    required: true,
    default: Date.now
  },
  metodoPago: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  estadoVenta: {
    type: String,
    default: "Pendiente", // Nuevo atributo para indicar si la venta ha sido pagada
    required: true
  },
  pagada: {
    type: Boolean,
    default: false,
    required: true
  },
  numeroEnvio: {
    type: String,
    default: "",
    
  }
});
VentaSchema.plugin(mongoosePaginate);
module.exports = model("Venta", VentaSchema, "ventas");