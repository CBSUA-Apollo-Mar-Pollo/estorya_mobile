import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Get token after 'Bearer '

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log("token verified");
    req.user = decoded; // decoded contains userId and email
    next();
  });
};
