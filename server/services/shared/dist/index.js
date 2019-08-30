"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
__export(require("./validation/login-user.validation"));
__export(require("./validation/register-user.validation"));
var config_1 = require("./config");
exports.config = config_1.config;
//# sourceMappingURL=index.js.map