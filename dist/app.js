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
//
function generateAccountsForTestScript() {
    const testAccount = new classes_1.Account("300", 0);
    classes_1.AccountsHandler.insertAccount(testAccount);
}
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
    const result = classes_1.AccountsHandler.getAccount(accountId);
    if (result.status === utils_1.OperationStatus.Failure) {
        res.status(404).send("0");
    }
    else {
        res.status(200).send(result.value.getBalance());
    }
});
app.post("/event", requestValidators_1.RequestValidator.validatePostRequest(), (req, res) => {
    if (req.body.type === "deposit") {
        const result = classes_1.AccountsHandler.getAccount(req.body.destination);
        if (result.status === utils_1.OperationStatus.Success) {
            result.value.deposit(req.body.amount);
            res.status(201).json({
                destination: result.value.id,
                balance: result.value.getBalance(),
            });
        }
        else {
            const account = new classes_1.Account(req.body.destination, req.body.amount);
            res.status(201).json({
                destination: { id: account.id, balance: account.getBalance() },
            });
        }
    }
    else if (req.body.type === "withdraw") {
        const getAccResult = classes_1.AccountsHandler.getAccount(req.body.origin);
        if (getAccResult.status === utils_1.OperationStatus.Success) {
            const result = getAccResult.value.withdraw(req.body.amount);
            res.status(201).json({
                destination: result.value.id,
                balance: result.value.getBalance(),
            });
        }
        else {
            const account = new classes_1.Account(req.body.destination, req.body.amount);
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
//# sourceMappingURL=app.js.map