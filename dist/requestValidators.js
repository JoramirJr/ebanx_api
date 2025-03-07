"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
class RequestValidator {
    static validateGetRequest(requiredParams) {
        return (req, res, next) => {
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
    static validatePostRequest() {
        return (req, res, next) => {
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
exports.RequestValidator = RequestValidator;
//# sourceMappingURL=requestValidators.js.map