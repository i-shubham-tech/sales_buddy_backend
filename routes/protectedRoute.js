const jwt = require("jsonwebtoken");

function protectedRoute(req, res, next) {
    const secretKey = "saleskey";

    try {
        const token = req.headers["authorization"]; // lowercase
        console.log(token)

        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized user" });
        }
        const tokenValue = token.split(" ")[1]

        jwt.verify(tokenValue, secretKey, (error, decoded) => {
            if (error) {
                return res.status(401).json({ status: false, message: "Invalid or expired token" });
            }

            req.user = decoded;

            next();
        });
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}

module.exports = protectedRoute;
