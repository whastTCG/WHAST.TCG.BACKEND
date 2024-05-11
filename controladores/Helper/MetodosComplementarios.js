const DatosEnvio = require('../../modelos/DatosEnvio');


const updateDatosEnvioVenta = async (id, casilla, direccionSucursal, entregaADomicilio) => {

    try {
        const ventaDatosEnvio = await DatosEnvio.findByIdAndUpdate(id, {
            nombreCasilla: casilla,
            direccionCasilla: direccionSucursal,
            entregaADomicilio: entregaADomicilio
        }, {new: true});

        return ventaDatosEnvio;

    } catch (error) {
        console.error("Error al actualizar los datos de envío:", error);
        throw new Error("Error al actualizar los datos de envío");
    }
};

module.exports = {
    updateDatosEnvioVenta
}