const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    rostro: {
      type: String,
      required: true,
    },
    parteSuperior: {
      type: String,
      required: true,
    },
    parteInferior: {
      type: String,
      required: true,
    },
    zapatos: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencia al modelo de usuario
      default: null,
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

module.exports = mongoose.model("Character", characterSchema);
