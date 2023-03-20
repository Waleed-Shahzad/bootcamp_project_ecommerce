// express is used to create the server; bodyParser is used to parse the request body; mongoose is used to connect to the database; morgan is used to log requests; and cors is used to allow cross-origin requests.
import express from "express";
// setting up dotenv to use the .env file
import dotenv from "dotenv";

// import nodejs module "path"
import path from "path";

import colors from "colors";

// import Morgan for logging the routes request
import morgan from "morgan";

// files created in routes, using express
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// setting up MongoDB connection
import connectDB from "./config/db.js";

// import error handling middleware
import { notFound, errorHandler } from "./middelware/errorMiddleware.js";

// configure the .env file
dotenv.config();

// call the connectDB function to connect to the database
connectDB();
// connect app with express framework; create express app;
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// this is the middleware that allows cross-origin requests and accept json data in the request body. it is a common way to handle the requests.
app.use(express.json());

// a simple get request; returns a string;
// app.get("/", (req, res) => {
//   res.send("Server status : 200 OK; Online :) Server is running");
// });

// Routes. Here, app.use is used to mount the routes. The routes are strings and second argument is the function that will be executed when the route is matched. The function is the actual route handler. The route handler is responsible for handling the request and sending the response. it is found in routes folder.

// Note that the Flow is as follows : app.use(route, handler)
// Server contains the route path and the handler function, then in routes folder, contains the remaining part of the route, type of API and the controller function.
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// PAYPAL api for payment
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Making a folder static in express, so that it can be accessed by the broswer. for instance our Upload folder is not yet accessible by the broswer because of its location, so we need to make it accessible by declaring it static. as fillows:
// __dirname does not work with ES6 and only works with plain JS synatx so we need to resolve this using path.resolve
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Server status : 200 OK; Online :) Server is running");
  });
}

// setting up custom error handler

app.use(notFound);

app.use(errorHandler);

// setting up PORT
const PORT = process.env.PORT || 5000;
// setting up port;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .bold
  )
);
