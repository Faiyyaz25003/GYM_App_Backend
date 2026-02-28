// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ msg: "No token" });

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = decoded;
//   next();
// };


import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // ✅ important
    next();
  } catch (err) {
    console.log("Token error:", err.message);
    return res.status(401).json({ msg: "Token invalid" });
  }
};