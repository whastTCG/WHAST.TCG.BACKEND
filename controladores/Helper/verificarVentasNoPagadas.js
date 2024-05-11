const VentaSchema = require('../../modelos/VentaSchema');
const Carta = require('../../modelos/Carta');
const { timer, repeat } = require("rxjs")
// Método para verificar y cancelar ventas no pagadas después de 24 horas
const verificarVentasNoPagadas = async () => {
    try {
        console.log("ejecutando metodo de verificarVentasNoPagadas... ")
        // Obtener todas las ventas pendientes
        const ventasPendientes = await VentaSchema.find({ estadoVenta: 'Pendiente', fechaEmision: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) } });

       // console.log(ventasPendientes)
        // Iterar sobre las ventas pendientes
        for (const venta of ventasPendientes) {

            // Cancelar la venta y revertir el stock de los productos
            await cancelarVenta(venta);
        }
    } catch (error) {
        console.error('Error al verificar ventas no pagadas:', error);
    }
};

// Método para cancelar una venta y revertir el stock de los productos
const cancelarVenta = async (venta) => {
    try {

        // Iterar sobre los productos de la venta
        for (const producto of venta.productos) {
            // Obtener la carta asociada al producto
            const carta = await Carta.findById(producto.carta);
            if (!carta) {
                throw new Error(`Carta no encontrada para el producto ${producto._id}`);
            }

            // Convertir el stock de cadena a número antes de sumarle la cantidad del producto
            const stockNumerico = parseInt(carta.stock);
            if (isNaN(stockNumerico)) {
                throw new Error(`El stock no es un número válido para el producto ${carta.cardText}`);
            }

            // Sumar la cantidad del producto al stock numérico
            carta.stock = stockNumerico + parseInt(producto.cantidad);
            await carta.save();
        }

        // Actualizar el estado de la venta a cancelada
        console.log(venta.estadoVenta);
        venta.estadoVenta = 'cancelada';
        await venta.save();

        console.log(`Venta cancelada: ${venta._id}`);
    } catch (error) {
        console.error(`Error al cancelar venta ${venta._id}:`, error);
    }
};

timer(1000 * 60 * 60 * 3).pipe(repeat()).subscribe(xd => {
    verificarVentasNoPagadas();
    console.log("prueba");
})

module.exports = { verificarVentasNoPagadas };