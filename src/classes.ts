class Account {
  public readonly id: number;
  protected balance: number;

  constructor(id: number, initialBalance: number) {
    this.id = id;
    this.balance = initialBalance;
  }
  getBalance() {}
  deposit() {}
  withdraw() {}
}

class AccountsHandler {
    
}
