"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const classes_1 = require("./classes");
const utils_1 = require("./utils");
const requestValidators_1 = require("./requestValidators");
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.post("/reset", (_, res) => {
    const result = classes_1.AccountsHandler.reset();
    if (result.status === utils_1.OperationStatus.Success) {
        res.status(200).send("OK");
    }
    else {
        res.status(500);
    }
});
app.get("/balance", requestValidators_1.RequestValidator.validateGetRequest(["accountId"]), (req, res) => {
    const accountId = req.query.accountId;
    const account = classes_1.AccountsHandler.accounts.get(accountId);
    if (!account) {
        res.status(404).send("0");
    }
    else {
        res.status(200).send(account.getBalance());
    }
});
app.post("/event");
// const accountId = req.query.accountId;
// const account = new Account(id: accountId, ini)
// AccountsHandler.insertAccount()
app.listen(port, () => {
    console.log("The server is up");
});
//# sourceMappingURL=app.js.map