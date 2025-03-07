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
            if (!(typeof req.body === "object" &&
                req.body !== null &&
                !Array.isArray(req.body))) {
                return res.status(400).json({
                    success: false,
                    error: `Body badly formatted. A JSON object is required`,
                });
            }
            if (req.body.type === "deposit") {
                if (!("destination" in req.body && "amount" in req.body)) {
                    return res.status(400).json({
                        success: false,
                        error: `Body badly formatted. Object missing fields.`,
                    });
                }
            }
            else if (req.body.type === "withdraw") {
                if (!("origin" in req.body && "amount" in req.body)) {
                    return res.status(400).json({
                        success: false,
                        error: `Body badly formatted. Object missing fields.`,
                    });
                }
            }
            else if (req.body.type === "trasfer") {
                if (!("origin" in req.body &&
                    "destination" in req.body &&
                    "amount" in req.body)) {
                    return res.status(400).json({
                        success: false,
                        error: `Body badly formatted. Object missing fields.`,
                    });
                }
            }
            next();
        };
    }
}
exports.RequestValidator = RequestValidator;
//# sourceMappingURL=requestValidators.js.map