import express from "express";
const app = express();
const port = 3000;

import { Account, AccountsHandler } from "./classes";
import { OperationStatus } from "./utils";
import { RequestValidator } from "./requestValidators";

app.post("/reset", (_, res) => {
  const result = AccountsHandler.reset();

  if (result.status === OperationStatus.Success) {
    res.status(200);
  } else {
    res.status(500);
  }
});

app.get(
  "/balance",
  RequestValidator.validateGetRequest(["accountId"]),
  (req, res) => {
    const accountId = req.query.accountId as string;
    const account = AccountsHandler.accounts.get(accountId);

    if (!account) {
      res.status(404).send(0);
    } else {
      res.status(200).send(account.getBalance());
    }
  }
);

// const accountId = req.query.accountId;
// const account = new Account(id: accountId, ini)
// AccountsHandler.insertAccount()

app.listen(port, () => {
  console.log("The server is up");
});
