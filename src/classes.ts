import { v4 as uuidv4 } from "uuid";

import { Result, OperationStatus, OperationResult } from "./utils";

export class Account {
  public readonly id: string;
  protected balance: number;

  constructor(id: string, initialBalance: number) {
    //
    // this.id = uuidv4();
    this.id = id;
    this.balance = initialBalance;
  }
  getBalance(): number {
    return this.balance;
  }
  deposit(amount: number): number {
    return amount > 0 ? (this.balance += amount) : this.balance;
  }
  withdraw(amount: number): OperationResult<number> {
    if (amount > 0) {
      return Result.failure(
        "Amount to be withdrawn should be greater than zero"
      );
    }
    if (amount >= this.balance) {
      this.balance -= this.balance - amount;
      return Result.success(this.balance);
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
      ? { status: OperationStatus.Success, value: null }
      : { status: OperationStatus.Failure, error: "Reset has failed" };
  }
  static getAccount(id: string): OperationResult<Account> {
    const result = AccountsHandler.accounts.get(id);

    if (result) {
      return { status: OperationStatus.Success, value: result };
    } else {
      return {
        status: OperationStatus.Failure,
        error: "Identificador não corresponde a nenhuma conta",
      };
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
      return { status: OperationStatus.Success, value: depositedAmount };
    }
    return { status: OperationStatus.Failure, error: withdrawOperation.error };
  }
  static insertAccount(
    account: Account
  ): OperationResult<Map<string, Account>> {
    const accountId = account.id;
    if (AccountsHandler.accounts.has(accountId)) {
      return {
        status: OperationStatus.Failure,
        error: "Account already exists",
      };
    }

    AccountsHandler.accounts.set(accountId, account);

    if (AccountsHandler.accounts.has(accountId)) {
      return {
        status: OperationStatus.Success,
        value: AccountsHandler.accounts,
      };
    } else {
      return {
        status: OperationStatus.Failure,
        error: "Account insertion has failed",
      };
    }
  }
}
