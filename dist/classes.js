"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsHandler = exports.Account = void 0;
const utils_1 = require("./utils");
class Account {
    constructor(id, initialBalance) {
        //
        // this.id = uuidv4();
        this.id = id;
        this.balance = initialBalance;
    }
    getBalance() {
        return this.balance;
    }
    deposit(amount) {
        this.balance += amount;
        return this.balance;
    }
    withdraw(amount) {
        if (amount < 0) {
            return utils_1.Result.failure("Amount to be withdrawn should be greater than zero");
        }
        if (amount <= this.balance) {
            this.balance -= amount;
            return utils_1.Result.success(this.balance);
        }
        else {
            return utils_1.Result.failure("The balance doesn't have enough funds");
        }
    }
}
exports.Account = Account;
class AccountsHandler {
    static reset() {
        AccountsHandler.accounts.clear();
        return AccountsHandler.accounts.size === 0
            ? { status: utils_1.OperationStatus.Success, value: null }
            : { status: utils_1.OperationStatus.Failure, error: "Reset has failed" };
    }
    static getAccount(id) {
        const result = AccountsHandler.accounts.get(id);
        if (result) {
            return { status: utils_1.OperationStatus.Success, value: result };
        }
        else {
            return {
                status: utils_1.OperationStatus.Failure,
                error: "Identificador não corresponde a nenhuma conta",
            };
        }
    }
    static transfer(source, target, amount) {
        const withdrawOperation = source.withdraw(amount);
        if (withdrawOperation.status === utils_1.OperationStatus.Success) {
            const depositedAmount = target.deposit(withdrawOperation.value);
            return { status: utils_1.OperationStatus.Success, value: depositedAmount };
        }
        return { status: utils_1.OperationStatus.Failure, error: withdrawOperation.error };
    }
    static insertAccount(account) {
        const accountId = account.id;
        if (AccountsHandler.accounts.has(accountId)) {
            return {
                status: utils_1.OperationStatus.Failure,
                error: "Account already exists",
            };
        }
        AccountsHandler.accounts.set(accountId, account);
        if (AccountsHandler.accounts.has(accountId)) {
            return {
                status: utils_1.OperationStatus.Success,
                value: AccountsHandler.accounts,
            };
        }
        else {
            return {
                status: utils_1.OperationStatus.Failure,
                error: "Account insertion has failed",
            };
        }
    }
}
exports.AccountsHandler = AccountsHandler;
AccountsHandler.accounts = new Map();
//# sourceMappingURL=classes.js.map