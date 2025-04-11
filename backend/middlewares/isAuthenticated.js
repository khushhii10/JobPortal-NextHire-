import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Use optional chaining to avoid errors if `cookies` is undefined

        if (!token || typeof token !== "string") {
            return res.status(401).json({
                message: "User not authenticated or token is invalid",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        req.id = decode.userId;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};

export default isAuthenticated;
