import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    if (req.user.role !== "User")
      return res.status(403).json({ error: "Unauthorized" });
    next();
    
  } catch (err) {
    res.status(401).json({ error: "Invalid token", err });
  }
};

export const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ error: "Access Denied" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    if (req.user.role !== "Admin")
      return res.status(403).json({ error: "Unauthorized" });
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
  }
 
};

export default  {};
