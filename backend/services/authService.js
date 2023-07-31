const bcyrpt = require('bcrypt');

const hashedPassword = async (password) => {
    const salt = await bcyrpt.genSalt(10);
    const hashed = await bcyrpt.hash(password, salt);
    return hashed;
}


module.exports = hashedPassword