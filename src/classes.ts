import { Result, OperationStatus, OperationResult } from "./utils";

export class Account {
  public readonly id: number;
  protected balance: number;

  constructor(id: number, initialBalance: number) {
    this.id = id;
    this.balance = initialBalance;
  }
  getBalance(): number {
    return this.balance;
  }
  deposit(amount: number): number {
    return amount > 0 ? (this.balance = amount) : this.balance;
  }
  withdraw(amount: number): OperationResult {
    if (amount > 0) {
      return Result.failure(
        "Amount to be withdrawn should be greater than zero"
      );
    }
    if (amount >= this.balance) {
      this.balance - amount;
      return Result.success(this.balance);
    } else {
      return Result.failure("The balance doesn't have enough funds");
    }
  }
}

export class AccountsHandler {
  protected static accounts: Map<string, Account>;

  static reset(): OperationResult {
    AccountsHandler.accounts.clear();

    return AccountsHandler.accounts.size === 0
      ? { status: OperationStatus.Success, value: 1 }
      : { status: OperationStatus.Failure, error: "Reset has failed" };
  }
  static transfer(
    source: Account,
    target: Account,
    amount: number
  ): OperationResult {
    const withdrawOperation = source.withdraw(amount);

    if (withdrawOperation.status === OperationStatus.Success) {
      const depositedAmount = target.deposit(withdrawOperation.value);
      return { status: OperationStatus.Success, value: depositedAmount };
    }
    return { status: OperationStatus.Failure, error: withdrawOperation.error };
  }
}
