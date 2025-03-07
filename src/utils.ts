export enum OperationStatus {
  Success,
  Failure,
}

type Success = {
  status: OperationStatus.Success;
  value: number;
};

type Failure = {
  status: OperationStatus.Failure;
  error: string;
};

export type OperationResult = Success | Failure;

export class Result {
  static success(value: number): OperationResult {
    return { status: OperationStatus.Success, value };
  }
  static failure(error: string): OperationResult {
    return { status: OperationStatus.Failure, error };
  }
}
