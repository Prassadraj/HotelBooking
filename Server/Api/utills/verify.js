import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "You are not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(500).json({ error: "Token is not valid" });
    }

    req.user = user;

    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // const {id}=req.params
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ error: "Unauthorized access" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // const {id}=req.params
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ error: "Unauthorized access" });
    }
  });
};

// Correcting the route definition for checking user with ID
