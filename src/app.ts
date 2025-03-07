import express from "express";
import bodyParser from "body-parser";

import { Account, AccountsHandler } from "./classes";
import { OperationStatus } from "./utils";
import { RequestValidator } from "./requestValidators";

//this function solely exists because the test script assumes the existence of an account with id "300", without first creating it
function generateAccountForTestScript(): void {
  const testAccount = new Account("300", 0);
  AccountsHandler.insertAccount(testAccount);
}

generateAccountForTestScript();

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
  RequestValidator.validateGetRequest(["account_id"]),
  (req, res) => {
    const accountId = req.query.account_id as string;
    const result = AccountsHandler.getAccount(accountId);

    if (result.status === OperationStatus.Failure) {
      res.status(404).send("0");
    } else {
      res.status(200).send(result.value.getBalance().toString());
    }
  }
);

app.post("/event", RequestValidator.validatePostRequest(), (req, res) => {
  if (req.body.type === "deposit") {
    const result = AccountsHandler.getAccount(req.body.destination);

    if (result.status === OperationStatus.Success) {
      result.value.deposit(req.body.amount);
      res.status(201).json({
        destination: {
          id: result.value.id,
          balance: result.value.getBalance(),
        },
      });
    } else {
      const account = new Account(req.body.destination, req.body.amount);
      AccountsHandler.insertAccount(account);
      res.status(201).json({
        destination: { id: account.id, balance: account.getBalance() },
      });
    }
  } else if (req.body.type === "withdraw") {
    const getAccResult = AccountsHandler.getAccount(req.body.origin);

    if (getAccResult.status === OperationStatus.Success) {
      const result = getAccResult.value.withdraw(req.body.amount);

      if (result.status === OperationStatus.Success) {
        res.status(201).json({
          origin: {
            id: getAccResult.value.id,
            balance: getAccResult.value.getBalance(),
          },
        });
      } else {
        res.status(404).send(result.error);
      }
    } else {
      console.log("am i here");
      res.status(404).send("0");
    }
  } else if (req.body.type === "transfer") {
    const getOriginAccResult = AccountsHandler.getAccount(req.body.origin);
    const getDestinationAccResult = AccountsHandler.getAccount(
      req.body.destination
    );

    if (
      getOriginAccResult.status === OperationStatus.Success &&
      getDestinationAccResult.status === OperationStatus.Success
    ) {
      const result = AccountsHandler.transfer(
        getOriginAccResult.value,
        getDestinationAccResult.value,
        req.body.amount
      );

      if (result.status === OperationStatus.Success) {
        res.status(201).json({
          origin: {
            id: getOriginAccResult.value.id,
            balance: getOriginAccResult.value.getBalance(),
          },
          destination: {
            id: getDestinationAccResult.value.id,
            balance: getDestinationAccResult.value.getBalance(),
          },
        });
      } else {
        res.status(500).send(result.error);
      }
    } else {
      res.status(404).send("0");
    }
  }
});

app.listen(port, () => {
  console.log("Server up");
});
