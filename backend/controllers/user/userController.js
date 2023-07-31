const { validationResult } = require('express-validator');


const register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Hata olması durumunda hataları gönder
        return res.status(400).json({ errors: errors.array() });
    } else {
        // Hata yoksa başarılı kayıt mesajını gönder
        return res.status(200).json({ message: "Registration Succesful!" });
    }
};

module.exports = register;