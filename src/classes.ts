import { v4 as uuidv4 } from "uuid";

import { Result, OperationStatus, OperationResult } from "./utils";

export class Account {
  public readonly id: string;
  protected balance: number;

  constructor(id: string, initialBalance: number) {
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
  getBalance(): number {
    return this.balance;
  }
  deposit(amount: number): number {
    this.balance += amount;
    return this.balance;
  }
  withdraw(amount: number): OperationResult<number> {
    if (amount < 0) {
      return Result.failure(
        "Amount to be withdrawn should be greater than zero"
      );
    }
    if (amount <= this.balance) {
      this.balance -= amount;
      return Result.success(amount);
    } else {
      return Result.failure("The balance doesn't have enough funds");
    }
  }
}

export class AccountsHandler {
  protected static accounts: Map<string, Account> = new Map();

  static reset(): OperationResult<null> {
    AccountsHandler.accounts.clear();

    return AccountsHandler.accounts.size === 0
      ? Result.success(null)
      : Result.failure("Reset has failed");
  }
  static getAccount(id: string): OperationResult<Account> {
    const result = AccountsHandler.accounts.get(id);

    if (result) {
      return Result.success(result);
    } else {
      return Result.failure("Identificador não corresponde a nenhuma conta");
    }
  }
  static transfer(
    source: Account,
    target: Account,
    amount: number
  ): OperationResult<number> {
    const withdrawOperation = source.withdraw(amount);

    if (withdrawOperation.status === OperationStatus.Success) {
      const depositedAmount = target.deposit(withdrawOperation.value);
      return Result.success(depositedAmount);
    }
    return Result.failure(withdrawOperation.error);
  }
  static insertAccount(
    account: Account
  ): OperationResult<Map<string, Account>> {
    const accountId = account.id;
    if (AccountsHandler.accounts.has(accountId)) {
      Result.failure("Account already exists");
    }

    AccountsHandler.accounts.set(accountId, account);

    if (AccountsHandler.accounts.has(accountId)) {
      return Result.success(AccountsHandler.accounts);
    } else {
      return Result.failure("Account insertion has failed");
    }
  }
}
