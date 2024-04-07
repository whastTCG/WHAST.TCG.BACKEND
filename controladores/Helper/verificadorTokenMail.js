const crypto = require('crypto');

const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

const generateVerificationLink = (req, token) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    return `${baseUrl}/verify-email?token=${token}`;
};


module.exports = {
    generateVerificationToken,
    generateVerificationLink
}