
const crypto = require('crypto');

// Función para generar una contraseña aleatoria
function generateRandomPassword() {
    return crypto.randomBytes(4).toString('hex');
}

module.exports = {
    generateRandomPassword
}