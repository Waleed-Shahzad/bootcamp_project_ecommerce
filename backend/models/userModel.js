import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// matchPassword is a method that is available on the userSchema. It is a virtual method that is not stored in the database. It is used to compare the password that is stored in the database with the password that is passed in when the user logs in.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// creating encrypted password for new registered user
// pre is a method that let's us do something before the user is saved to the database
// isModified is a method that let's us know if the password has been modified or not
// salt rounds is the number of times the password is hashed.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

export default User;
