"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsHandler = exports.Account = void 0;
const utils_1 = require("./utils");
class Account {
    constructor(id, initialBalance) {
        /*
          as the test script assumes the existence of an account with id "300", without first creating it (see line 8, app.ts),
          I implemented this constructor with the "id" parameter (literally, just because of the aforementioned scenario); otherwise,
          I'd probably implement the id generation as shown below, using the uuid lib to create an universally unique
          identifier for each account
        */
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
            return utils_1.Result.success(amount);
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
            ? utils_1.Result.success(null)
            : utils_1.Result.failure("Reset has failed");
    }
    static getAccount(id) {
        const result = AccountsHandler.accounts.get(id);
        if (result) {
            return utils_1.Result.success(result);
        }
        else {
            return utils_1.Result.failure("Identificador não corresponde a nenhuma conta");
        }
    }
    static transfer(source, target, amount) {
        const withdrawOperation = source.withdraw(amount);
        if (withdrawOperation.status === utils_1.OperationStatus.Success) {
            const depositedAmount = target.deposit(withdrawOperation.value);
            return utils_1.Result.success(depositedAmount);
        }
        return utils_1.Result.failure(withdrawOperation.error);
    }
    static insertAccount(account) {
        const accountId = account.id;
        if (AccountsHandler.accounts.has(accountId)) {
            utils_1.Result.failure("Account already exists");
        }
        AccountsHandler.accounts.set(accountId, account);
        if (AccountsHandler.accounts.has(accountId)) {
            return utils_1.Result.success(AccountsHandler.accounts);
        }
        else {
            return utils_1.Result.failure("Account insertion has failed");
        }
    }
}
exports.AccountsHandler = AccountsHandler;
AccountsHandler.accounts = new Map();
//# sourceMappingURL=classes.js.map