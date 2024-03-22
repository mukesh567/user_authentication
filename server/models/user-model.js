const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Secure the password
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    //Hash the password
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//Compare the password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//JWT
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        username: this.username,
        email: this.email,
        phone: this.phone,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "60d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
