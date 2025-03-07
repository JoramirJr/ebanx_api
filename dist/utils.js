"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.OperationStatus = void 0;
var OperationStatus;
(function (OperationStatus) {
    OperationStatus[OperationStatus["Success"] = 0] = "Success";
    OperationStatus[OperationStatus["Failure"] = 1] = "Failure";
})(OperationStatus || (exports.OperationStatus = OperationStatus = {}));
class Result {
    static success(value) {
        return { status: OperationStatus.Success, value };
    }
    static failure(error) {
        return { status: OperationStatus.Failure, error };
    }
}
exports.Result = Result;
//# sourceMappingURL=utils.js.map