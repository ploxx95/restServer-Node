require("./config");
const express = require("express");
const app = express();

/*****BODY PARSER */
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
/*****BODY PARSER */

app.get("/user", function (req, res) {
  res.json("Get Usuario");
});

app.post("/user", function (req, res) {
  let body = req.body;
  if (body.name === undefined) {
    res.status(400).json({ ok: false, message: "The name is required" });
  } else {
    res.json({ dataUser: body });
  }
});

app.put("/user/:id", function (req, res) {
  let id = req.params.id;
  res.json({ id });
});

app.delete("/user", function (req, res) {
  res.json("Delete Usuario");
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando el Puerto 3000");
});
