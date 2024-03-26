const {Schema, model}  = require("mongoose");

const DatosPersonalesSchema = new Schema({
    direccion :{
        type: String,
        default:"NA"
    },
    rut:{
        type:String,
        default:"NA"
    },
    ciudad:{
        type:String,
        default:"NA"
    },
 
    region:{
        type:String,
        default:"NA"
    },
    comuna:{
        type:String,
        default:"NA"
    },
    pais:{
        type:String,
        default:"Chile"
    },
    user:{
        type:Schema.ObjectId,
        ref:"User"
    },
    telefono:{
        type:String,
        default:"000000000"
    },

    
})

module.exports = model("DatosPersonales", DatosPersonalesSchema, "datosPersonales");