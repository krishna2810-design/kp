const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: function () {
        return "Invalid email format";
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  tokens: [
    {
      token: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
  allowAccess: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew) {
    bcryptjs.genSalt(10).then((salt) => {
      bcryptjs.hash(user.password, salt).then((encryptedPassword) => {
        user.password = encryptedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.statics.findByCredential = function (email, password) {
  const User = this;
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject({ email: "Email doesn't exist" });
      }
      return bcryptjs.compare(password, user.password).then((result) => {
        if (result) {
          return user;
        } else {
          return Promise.reject({ password: "Invalid Password" });
        }
      });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

userSchema.statics.findByToken = function (token) {
  const User = this;
  let tokenData;
  try {
    tokenData = jwt.verify(token, "jwt@123");
  } catch (err) {
    return Promise.reject(err);
  }
  return User.findOne({
    id: tokenData._id,
    "tokens.token": token,
  });
};

userSchema.methods.generateToken = function () {
  const user = this;
  const tokenData = {
    id: user._id,
    username: user.username,
    createdAt: Number(Date.now()),
  };
  const token = jwt.sign(tokenData, "jwt@123");
  user.tokens.push({
    token,
  });
  return user
    .save()
    .then((user) => {
      return Promise.resolve({ token, user });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
