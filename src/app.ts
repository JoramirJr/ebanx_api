import express from "express";
import bodyParser from "body-parser";

import { Account, AccountsHandler } from "./classes";
import { OperationStatus } from "./utils";
import { RequestValidator } from "./requestValidators";

//
function generateAccountsForTestScript(): void {
  const testAccount = new Account("300", 0);
  AccountsHandler.insertAccount(testAccount);
}

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/reset", (_, res) => {
  const result = AccountsHandler.reset();

  if (result.status === OperationStatus.Success) {
    res.status(200).send("OK");
  } else {
    res.status(500);
  }
});

app.get(
  "/balance",
  RequestValidator.validateGetRequest(["accountId"]),
  (req, res) => {
    const accountId = req.query.accountId as string;
    const result = AccountsHandler.getAccount(accountId);

    if (result.status === OperationStatus.Failure) {
      res.status(404).send("0");
    } else {
      res.status(200).send(result.value.getBalance());
    }
  }
);

app.post("/event", RequestValidator.validatePostRequest(), (req, res) => {
  if (req.body.type === "deposit") {
    const result = AccountsHandler.getAccount(req.body.destination);

    if (result.status === OperationStatus.Success) {
      result.value.deposit(req.body.amount);
      res.status(201).json({
        destination: result.value.id,
        balance: result.value.getBalance(),
      });
    } else {
      const account = new Account(req.body.destination, req.body.amount);
      res.status(201).json({
        destination: { id: account.id, balance: account.getBalance() },
      });
    }
  } else if (req.body.type === "withdraw") {
    const getAccResult = AccountsHandler.getAccount(req.body.origin);

    if (getAccResult.status === OperationStatus.Success) {
      const result = getAccResult.value.withdraw(req.body.amount);

        
      res.status(201).json({
        destination: result.value.id,
        balance: result.value.getBalance(),
      });
    } else {
      const account = new Account(req.body.destination, req.body.amount);
      res.status(201).json({
        destination: { id: account.id, balance: account.getBalance() },
      });
    }
  }
});

// const accountId = req.query.accountId;
// const account = new Account(id: accountId, ini)
// AccountsHandler.insertAccount()

app.listen(port, () => {
  console.log("The server is up");
});
