import express from "express";
const app = express();
const port = 3000;

import { AccountsHandler } from "./classes";
import { OperationStatus } from "./utils";

app.get("/reset", (_, res) => {
  const result = AccountsHandler.reset();

  if (result.status === OperationStatus.Success) {
    res.status(200);
  } else {
    res.status(500);
  }
});

app.listen(port, () => {
  console.log("The server is up");
});
