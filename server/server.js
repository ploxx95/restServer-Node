require("./config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

/*****BODY PARSER */
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
/*****BODY PARSER */

app.use(require("./routes/usuario"));

//{useNewUrlParser: true}
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) {
    throw err;
  }
  console.log("BASE DE DATOS ONLINE");
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando el Puerto 3000");
});
