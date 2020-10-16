const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let rolsRight = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol valido",
};

let usuarioScheme = new Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "The email is required"],
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  img: {
    type: String,
    required: [false],
  },
  role: { type: String, default: "USER_ROLE", enum: rolsRight },
  state: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

//disable of devolution password
usuarioScheme.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
usuarioScheme.plugin(uniqueValidator, { message: "{PATH} ya existe" });

module.exports = mongoose.model("User", usuarioScheme);
