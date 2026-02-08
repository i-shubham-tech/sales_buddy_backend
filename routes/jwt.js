const jwt = require('jsonwebtoken')
const secretKey = "saleskey"

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: "5Day" })
}

module.exports = generateToken



