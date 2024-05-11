
const {  valDatosEnvioNoRegistrado } = require('../controladores/Helper/Validar');
const EnvioNoRegistrado = require('../modelos/EnvioNoRegistrado');
const VentaSchema = require('../modelos/VentaSchema');
const { correoDeVenta } = require("../apiResend");

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "soy una accion de prueba en mi controlador EnvioNoRegistrado"
    });
}


//metodo que no usaremos por ahora ya que los datos personales se crean automaticamente cuando se ejecuta el end point de crear usuarios
const crearDatosEnvio = async (req, res) => {


    //capturamos los parametros

    const params = req.body;

    const entregaPresencial =  req.body.entregaPresencial;

    const casillaCorreo =  req.body.casillaCorreo;

    const direccionSucursal = req.body.direccionSucursal;

    const productos =  req.body.productos;

    const metodoPago = req.body.metodoPago;

    const total = req.body.total;

    const { params: { rut, nombreCompleto, telefono, region, direccion, comuna, ciudad, email } } = params;




    //validamos los campos para que no puedan ingresas campos vacios 
    try {

        valDatosEnvioNoRegistrado({ rut, nombreCompleto, telefono, region, direccion, comuna, ciudad, email });


    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "ingrese campos validos",
            status: "error",
            error
        })
    }


    //encontrar la ultima venta
    const ultimaVenta = await VentaSchema.findOne().sort({ fechaEmision: -1 });


    if (!ultimaVenta) {
        // Manejar el caso donde no se encuentra ninguna venta
        return res.status(404).send({
            status: "error",
            message: "No se encontraron ventas"
        });
    }

    // buscamos si el usuario logeado ya tiene sus datos creados 


    //creamos  los nuevos datos personales con el id del usuario logeado
    const newDatosEnvio = new EnvioNoRegistrado({
        venta: ultimaVenta._id,
        direccion: direccion ? direccion : 'NA',
        rut: rut ? rut : 'NA',
        nombreCompleto: nombreCompleto ? nombreCompleto : 'NA',
        ciudad: ciudad ? ciudad : 'NA',
        region: region ? region : 'NA',
        comuna: comuna ? comuna : 'NA',
        telefono: telefono ? telefono : 'NA',
        pais: 'Chile', // Supongo que 'pais' y 'codigoPostal' no están en los datos originales, así que los establezco directamente
        codigoPostal: '00000000',
        entregaPresencial,
        casillaCorreo,
        direccionSucursal: direccionSucursal ? direccionSucursal : direccion,
        email
    });

    //convertir datos si es necesario
 
    correoDeVenta(email, productos, total, metodoPago, ultimaVenta._id);

    try {
        let DatosEnvio = await newDatosEnvio.save();
        return res.status(200).send({
            status: "success",
            message: "Datos de envio no registrado creados correctamente",
            DatosEnvio,
            venta: ultimaVenta

        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "error en la peticion",
            error: error,

        });
    }


}
module.exports = {
    prueba,
    crearDatosEnvio
}