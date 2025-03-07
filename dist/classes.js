class Account {
    constructor(id, initialBalance) {
        this.id = id;
        this.balance = initialBalance;
    }
    getBalance(id) {
        return this.balance;
    }
    deposit(id, amount) {
        return amount > 0 ? (this.balance = amount) : this.balance;
    }
    withdraw(id, amount) { }
}
class AccountsHandler {
    static reset() {
        AccountsHandler.accounts.clear();
    }
    static transfer(source, target) { }
}
//# sourceMappingURL=classes.js.map