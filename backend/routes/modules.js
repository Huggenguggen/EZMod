const express = require('express');

const moduleRoutes = express.Router();

const dbo = require('../db/conn');

moduleRoutes.route("/2021-2022-S2-R0").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("2021-2022-S2-R0")
    .find({})
    //.limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

moduleRoutes.route("/2021-2022-S2-R1").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("2021-2022-S2-R1")
    .find({})
    //.limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

moduleRoutes.route("/2021-2022-S2-R2").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("2021-2022-S2-R2")
    .find({})
    //.limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

moduleRoutes.route("/2021-2022-S2-R3").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("2021-2022-S2-R3")
    .find({})
    //.limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});


module.exports = moduleRoutes;

