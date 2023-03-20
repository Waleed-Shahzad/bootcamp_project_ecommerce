import jwt from "jsonwebtoken";

// Generate a token. it is a boilerplate code
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default generateToken;
