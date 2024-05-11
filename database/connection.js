const mongoose = require("mongoose");
require('dotenv').config(); // Importar y configurar dotenv
//importar metodo para verificar cuentas no pagadas dentro de 24 horas
const { verificarVentasNoPagadas } = require("../controladores/Helper/verificarVentasNoPagadas");
const connection = async () => {

    try {

        await mongoose.connect(
            //"mongodb+srv://whasttcg:qHn4gvZJ9V8jAWGF@cluster0.blxft2z.mongodb.net/CartasWhastTCG", 
            process.env.MONGODB_URI,
            
            {
                useNewUrlParser: true,
               // createIndexes: true,
                useUnifiedTopology: true,
                family: 4
                
            }
        );

        //se le debe pasar el family 4 en caso que te salga este error MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
        // ya que el protocolo ipv6 no funcionma y al; usar family 4 fuerza a usar el ipv4

        // parametros a pasar dentro de objeto // solo en caso de fallos 
        // useNewUrlParser: true
        //useCreateIndex: true

        console.log("Conectado Correctamente a la base de datos CartasWgastTCG");
        verificarVentasNoPagadas();
    } catch (error) {
        console.log(error)
        throw new Error(" no se ha podido conectar a la base de datos ");
    }

}

module.exports = {
    connection
}