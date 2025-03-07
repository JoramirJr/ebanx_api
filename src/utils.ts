export enum OperationStatus {
  Success,
  Failure,
}

type Success<T> = {
  status: OperationStatus.Success;
  value: T;
};

type Failure = {
  status: OperationStatus.Failure;
  error: string;
};

export type OperationResult<T> = Success<T> | Failure;

export class Result {
  static success<T>(value: T): OperationResult<T> {
    return { status: OperationStatus.Success, value };
  }
  static failure<T>(error: string): OperationResult<T> {
    return { status: OperationStatus.Failure, error };
  }
}
