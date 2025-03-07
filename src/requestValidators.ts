import { Request, Response, NextFunction } from "express";

interface PayloadCommon {
  type: "withdraw" | "transfer" | "deposit";
  amount: number;
}

interface CreateDepositAccountPayload extends PayloadCommon {
  destination: number;
}

interface WithdrawAccountPayload extends PayloadCommon {
  origin: number;
}

interface TransferAccountPayload extends PayloadCommon {
  origin: number;
  destination: number;
}

export class RequestValidator {
  static validateGetRequest(
    requiredParams: string[]
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      const missingParams = requiredParams.filter((param) => !req.query[param]);

      if (missingParams.length > 0) {
        return res.status(400).json({
          success: false,
          error: `Missing required parameters: ${missingParams.join(", ")}`,
        });
      }

      next();
    };
  }
  static validatePostRequest(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      const missingParams = requiredParams.filter((param) => !req.query[param]);

      if (missingParams.length > 0) {
        return res.status(400).json({
          success: false,
          error: `Missing required parameters: ${missingParams.join(", ")}`,
        });
      }

      next();
    };
  }
}
