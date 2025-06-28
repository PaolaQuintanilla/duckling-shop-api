"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DucksModule = void 0;
const common_1 = require("@nestjs/common");
const ducks_controller_1 = require("./controllers/ducks.controller");
const mongoose_1 = require("@nestjs/mongoose");
const duck_schema_1 = require("./schemas/duck.schema");
const ducks_service_1 = require("./services/ducks.service");
const duck_repository_1 = require("./repositories/duck.repository");
const application_exceptions_1 = require("../../common/exceptions/application.exceptions");
let DucksModule = class DucksModule {
};
exports.DucksModule = DucksModule;
exports.DucksModule = DucksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: duck_schema_1.Duck.name, schema: duck_schema_1.DuckSchema }]),
        ],
        controllers: [ducks_controller_1.DucksController],
        providers: [ducks_service_1.DucksService, duck_repository_1.DuckRepository, application_exceptions_1.ApplicationExceptions],
        exports: [duck_repository_1.DuckRepository],
    })
], DucksModule);
//# sourceMappingURL=ducks.module.js.map