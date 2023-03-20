import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

// configure the .env file
dotenv.config();

// call the connectDB function to connect to the database
connectDB();

// operations on data for seeding into the mongoDB
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insertmany is a method of mongoose that inserts multiple documents into the database.
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log(colors.green.inverse("Data imported successfully"));
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// operation on data to delete from MongoDB
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(
      colors.red.inverse(
        "Data destroyed successfully, just as your life, Happy Now?"
      )
    );
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// process.argv is an array that contains the command line arguments. the first element is the node command, the second element is the file name, and the rest of the elements are the command line arguments. the command line arguments are passed as strings.

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
