import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// middleware to check if the user is logged in.
// if the user is logged in, the middleware will check if the user is authorized to access the route.
// req.user is the user object that is stored in the JWT token.
// req.headers.authorization is the token that is sent in the request.
// startsWith is a method that checks if the string starts with the given string.
// verify is a method that verifies the token.
// select is a method that selects the user object from the token.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {}
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized to access this route");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as Admin");
  }
};

export { protect, admin };
