const express = require("express");

const app = express();

app.use(express.json());

let accounts = {};

app.get("/reset", (_, res) => {
  accounts = {};
  res.status(200).send("OK");
});

app.get("/balance", (_, res) => {
  accounts = {};
  res.status(200).send("OK");
});

app.listen(3001, () => {
  console.log("Everything good");
});

//()
