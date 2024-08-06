const express = require("express");
const { resetAccounts, getAccountBalance } = require("./handlers");

const app = express();

app.use(express.json());

app.get("/reset", (_, res) => {
  resetAccounts();
  res.status(200).send("OK");
});

app.get("/balance", (req, res) => {
  const id = req.query.account_id;
  const account_balance = getAccountBalance(id);
  if (account_balance) {
    res.status(200).send(account_balance);
  } else {
    res.status(200).send("OK");
  }
});

app.post("/event", (req, res) => {
  const { type, destination, amount } = req.body;
  const account_balance = getAccountBalance(id);
  if (account_balance) {
    res.status(200).send(account_balance);
  } else {
    res.status(200).send("OK");
  }
});

app.listen(3001, () => {
  console.log("Everything good");
});

//()
