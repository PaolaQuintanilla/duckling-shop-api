"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationExceptions = void 0;
const common_1 = require("@nestjs/common");
let ApplicationExceptions = class ApplicationExceptions {
    badRequestException(message) {
        throw new common_1.BadRequestException(message);
    }
    notFoundException(message) {
        throw new common_1.NotFoundException(message);
    }
    internalServerErrorException(message) {
        throw new common_1.InternalServerErrorException(message);
    }
};
exports.ApplicationExceptions = ApplicationExceptions;
exports.ApplicationExceptions = ApplicationExceptions = __decorate([
    (0, common_1.Injectable)()
], ApplicationExceptions);
//# sourceMappingURL=application.exceptions.js.map