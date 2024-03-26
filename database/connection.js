const mongoose = require("mongoose");

const connection = async() => {

    try {

        await mongoose.connect("mongodb://localhost:27017/CartasWhastTCG",{family:4});

        //se le debe pasar el family 4 en caso que te salga este error MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
        // ya que el protocolo ipv6 no funcionma y al; usar family 4 fuerza a usar el ipv4

        // parametros a pasar dentro de objeto // solo en caso de fallos 
        // useNewUrlParser: true
        //useCreateIndex: true

        console.log("Conectado Correctamente a la base de datos CartasWgastTCG");

    } catch (error) {
        console.log(error)
        throw new Error(" no se ha podido conectar a la base de datos ");
    }

}

module.exports = {
    connection
}