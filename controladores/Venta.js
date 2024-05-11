const venta = require("../modelos/VentaSchema");
const User = require('../modelos/User');
const Carta = require("../modelos/Carta");
const { valorDolar } = require("../modelos/ValorDolar");
const { correoDeVenta } = require("../apiResend");
const { isValidObjectId } = require("../controladores/Helper/Validar")
//metodo complemetario
const { updateDatosEnvioVenta } = require("./Helper/MetodosComplementarios");

const pruebaVenta = (req, res) => {

    try {

        return res.status(200).send({
            status: "success",
            message: "metodo de prueba ejecutado con exito"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "error al ejecutar la funcion de prueba"
        });
    }

};


const crearVenta = async (req, res) => {
    try {
        // Obtener los parámetros
        const { usuarioEntidad, productos, metodoPago, casillaCorreo, direccionSucursal, entregaPresencial, idEnvio } = req.body;

        // Verificar si el usuario existe // en caso de que el usuario compre como invitado se tomara en el front end el id del admin por eso siemrpe llegara un id de usuario
        // indpendiente si se compro con cuenta o como invitado
        const usuario = await User.findById(usuarioEntidad).select({ name: 1, surname: 1, email: 1 });
        if (!usuario) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        // Obtener los detalles de los productos
        const productosConDetalles = await Promise.all(
            productos.map(async (producto) => {
                const carta = await Carta.findOne({ _id: producto._id }).select({ "create_at": 0, cardImg: 0 });
                if (!carta) {
                    throw new Error(`Producto ${producto.carta} no encontrado`);
                }

                // Convertir el stock de string a número
                const stockNumerico = parseInt(carta.stock);

                // Verificar si el stock es suficiente para la venta
                if (stockNumerico < producto.cantidad) {
                    throw new Error(`Stock insuficiente para el producto ${carta.cardText}`);
                }

                // Verificar si el stock es un número válido y mayor que cero
                if (isNaN(stockNumerico) || stockNumerico <= 0) {
                    throw new Error(`Stock inválido para el producto ${carta.cardText}`);
                }

                // Verificar si la cantidad de productos es un número válido y mayor que cero
                if (isNaN(producto.cantidad) || producto.cantidad <= 0) {
                    throw new Error(`Cantidad inválida para el producto ${carta.cardText}`);
                }

                // Extraer el valor numérico del precio del producto
                const precioProducto = parseFloat(carta.cardPrice.replace('$', ''));

                //sotck a actualizar
                const stockActualuizado = stockNumerico - producto.cantidad;
                // Actualizar el stock de la carta
                await Carta.findByIdAndUpdate(producto._id, { stock: stockActualuizado }, { new: true });

                return {
                    carta: carta,
                    cantidad: producto.cantidad,
                    precio: Math.round(precioProducto * valorDolar())
                };
            })
        );

        // Calcular el total de la venta
        const total = productosConDetalles.reduce((acumulado, producto) => {
            return acumulado + (producto.precio * producto.cantidad);
        }, 0);

        // Crear la nueva venta
        const nuevaVenta = await venta.create({
            usuario: usuario,
            productos: productosConDetalles,
            metodoPago,
            total
        });


        //conmvertir valores si es necesario
        const idVentaString = nuevaVenta._id.toString();
        const totalNumerico = parseFloat(total); // Convierte la cadena de texto a un número

        //console.log(idVentaString);
        //mandar correo cuando el usuario es distinto al id del admin ( quiere decir que compro con cuenta registrada ) 
        if (usuarioEntidad !== "6565014ba4db4b9b988bfff5") {

            await updateDatosEnvioVenta(idEnvio, casillaCorreo, direccionSucursal, entregaPresencial);
            //metodo para enviar el correo con los datos de venta
            await correoDeVenta(usuario.email, productos, totalNumerico, metodoPago, idVentaString);
        }



        return res.status(201).json({
            status: 'success',
            message: 'Venta creada con éxito',
            venta: nuevaVenta
        });
    } catch (error) {
        if (error.message.includes('Producto')) {
            return res.status(404).json({
                status: 'error',
                message: error.message
            });
        } else {
            console.error(error);
            return res.status(500).json({
                status: 'error',
                message: 'Error al crear la venta'
            });
        }
    }
};

const buscarVenta = async (req, res) => {

    //capturar el parametro 
    const codigoVenta = req.query.ventaCodigo;

    if (!isValidObjectId(codigoVenta)) {
        return res.status(400).send({
            status: "no encontrado",
            message: "Venta no encontrada",
            error: "el codigo no es valido"
        });
    }

    try {

        //buscar la venta por el codigo o id
        const ventaBuscada = await venta.findById(codigoVenta);

        //preguntar si la venta se encontro

        if (!ventaBuscada) {
            //mandar el response 404 en caso que no se encuentre
            return res.status(404).send({
                status: "no encontrado",
                message: "Venta no encontrada"
            });
        }

        //si se encuentra la venta, devolverla en la respuesta
        res.status(200).send({
            status: "success",
            message: "venta encontrada",
            venta: ventaBuscada
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error al buscar la venta"
        })
    }
}

const buscarUltimaVenta = async (req, res) => {
    try {
        // Buscar la última venta ordenando por fecha de emisión en orden descendente
        const ultimaVenta = await venta.findOne().sort({ fechaEmision: -1 });

        if (!ultimaVenta) {
            // Manejar el caso donde no se encuentra ninguna venta
            return res.status(404).send({
                status: "error",
                message: "No se encontraron ventas"
            });
        }

        // Aquí puedes hacer lo que necesites con la última venta encontrada
        // Por ejemplo, devolverla como respuesta
        return res.status(200).send({
            status: "success",
            venta: ultimaVenta
        });
    } catch (error) {
        console.error("Error al buscar la última venta:", error);
        return res.status(500).send({
            status: "error",
            message: "Error al buscar la última venta"
        });
    }
}

const listarVentas = async (req, res) => {

    try {
        // sacamos el id de nuestro metodo auth
        const userIdentity = req.user.id;
        // sacamos el numero por parametro de la pagina 
        let page = parseInt(req.query.page)

        // obntienes el numero total de items le pasamos la query para que busque en caso de agregar algun filtro
        const total = await venta.countDocuments({ usuario: userIdentity });

        if (!page) {
            page = 1
        }

        let opciones = {
            page,
            limit: 3,
            populate: 'productos.carta',
            sort: { fechaEmision: -1 },

        }

        const historialVenta = await venta.paginate({ usuario: userIdentity }, opciones);

        return res.status(200).send({
            status: 'success',
            message: 'listado de forma exitosa ',
            ventas: historialVenta.docs,
            pagina: page,
            total,
            // totalBusqueda,

            // redondeamos con ceil el numero de paginas con usuarios a mostrar
            pages: Math.ceil(total / 3)

        })
    } catch (error) {
        console.error("Error al listar las ventas:", error);
        return res.status(500).send({
            status: "error",
            message: "Error al ejectuar la funcion"
        });
    }
}

module.exports = {
    pruebaVenta,
    crearVenta,
    buscarVenta,
    buscarUltimaVenta,
    listarVentas
}