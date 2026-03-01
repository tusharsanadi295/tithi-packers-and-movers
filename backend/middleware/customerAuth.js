import jwt from "jsonwebtoken";

export const customerAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ success: false });
  }
};