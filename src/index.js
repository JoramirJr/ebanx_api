const express = require("express");
const {
  resetAccounts,
  getAccountBalance,
  createOrUpdateAccount,
} = require("./handlers");

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
    res.status(200).send(account_balance.toString());
  } else {
    res.status(404).send("0");
  }
});

app.post("/event", (req, res) => {
  const { status, body } = createOrUpdateAccount(req.body);
  res.status(status).send(body);
});

app.listen(3001, () => {
  console.log("Everything good");
});
