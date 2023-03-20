// moongoose connection to mongodb server and database. it is a promise.
// it is a boilerpplate code
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`error: ${error.message}`.red);
    process.exit(1);
  }
};
// Process.env.MONGO_URI is a variable that is set in the .env file. it is a secret key.
// conn.connection.host is the host of the mongodb server. it is a string.
// Process.exit(1) is used to exit the process with error. if no error then it will exit with 0. it is a common way to exit the process.
export default connectDB;
