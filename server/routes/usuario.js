const express = require("express");
const User = require("../../models/usuario");
const bcrypt = require("bcrypt"); //crypt password librarie
const _ = require("underscore");

const app = express();

app.get("/user", function (req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 3;
  limite = Number(limite);
  User.find({ state: true }, "name email role state google img")
    .skip(desde)
    .limit(limite)
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({ ok: false, err });
      }

      User.count({ state: true }, (err, conteo) => {
        res.json({ ok: true, user, cuantos: conteo });
      });
    });
});

app.post("/user", function (req, res) {
  let body = req.body;

  let usuario = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, userDB) => {
    if (err) {
      return res.status(400).json({ ok: false, err });
    }
    res.json({ ok: true, usuario: userDB });
  });
});

app.put("/user/:id", function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["name", "email", "img", "role", "state"]);

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, userDB) => {
      if (err) {
        return res.status(400).json({ ok: false, err });
      }

      res.json({ ok: true, usuario: userDB });
    }
  );
});

app.delete("/user/:id", function (req, res) {
  let changeState = {
    state: false,
  };
  let id = req.params.id;
  User.findByIdAndUpdate(
    id,
    changeState,
    { new: true },
    (err, userDBDelete) => {
      if (err) {
        return res.status(400).json({ ok: false, err });
      }

      res.json({ ok: true, usuario: userDBDelete });
    }
  );

  // User.findByIdAndRemove(id, (err, userDelete) => {
  //   if (err) {
  //     return res.status(400).json({ ok: false, err });
  //   }
  //   if (!userDelete) {
  //     return res
  //       .status(400)
  //       .json({ ok: false, err: { message: "USUARIO NO ENCONTRADO" } });
  //   }
  //   res.json({ ok: true, usuario: userDelete });
  // });
});
module.exports = app;
