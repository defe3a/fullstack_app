const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true },
    },
    userName: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true },
    },
    fullName: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
).set("toJSON", {
  transform: (document, object) => {
    object.id = document.id;
    delete object._id;
    delete object.password;
  },
});

module.exports = mongoose.model("User", userSchema);
