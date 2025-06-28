"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_controller_1 = require("./controllers/orders.controller");
const orders_service_1 = require("./services/orders.service");
const mongoose_1 = require("@nestjs/mongoose");
const order_schema_1 = require("./schemas/order.schema");
const order_repository_1 = require("./repositories/order.repository");
const price_calculator_service_1 = require("./services/price-calculator.service");
const duck_schema_1 = require("../ducks/schemas/duck.schema");
const duck_repository_1 = require("../ducks/repositories/duck.repository");
const application_exceptions_1 = require("../../common/exceptions/application.exceptions");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema },
                { name: duck_schema_1.Duck.name, schema: duck_schema_1.DuckSchema },
            ]),
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [
            application_exceptions_1.ApplicationExceptions,
            orders_service_1.OrdersService,
            price_calculator_service_1.PriceCalculatorService,
            duck_repository_1.DuckRepository,
            order_repository_1.OrderRepository,
        ],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map