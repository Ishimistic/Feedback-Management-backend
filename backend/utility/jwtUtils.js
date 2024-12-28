import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, role: user.isAdmin ? "Admin" : "User" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};
