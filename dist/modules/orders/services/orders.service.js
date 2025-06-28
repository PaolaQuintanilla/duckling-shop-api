"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_1 = require("../repositories/order.repository");
const order_schema_1 = require("../schemas/order.schema");
const package_factory_1 = require("./packaging/packages/package-factory");
const filler_factory_1 = require("./packaging/fillers/filler-factory");
const order_response_dto_1 = require("../dtos/order-response.dto");
const price_calculator_service_1 = require("./price-calculator.service");
const duck_repository_1 = require("../../../modules/ducks/repositories/duck.repository");
const application_exceptions_1 = require("../../../common/exceptions/application.exceptions");
let OrdersService = class OrdersService {
    constructor(exception, orderRepository, priceCalculatorService, duckRepo) {
        this.exception = exception;
        this.orderRepository = orderRepository;
        this.priceCalculatorService = priceCalculatorService;
        this.duckRepo = duckRepo;
    }
    async createOrder(createOrderDto) {
        const duck = await this.duckRepo.findById(createOrderDto.duckId);
        if (!duck)
            this.exception.notFoundException('Duck not found');
        const { size, shippingType, color, amountDucks, destinyCountry } = createOrderDto;
        const packageDuck = package_factory_1.PackageFactory.createPackage(size);
        const fillerStrategy = filler_factory_1.FillerFactory.getFillerStrategy(shippingType);
        const filler = fillerStrategy.getFiller(packageDuck.getPackagingType(), shippingType);
        const order = new order_schema_1.Order();
        order.color = color;
        order.size = size;
        order.amountDucks = amountDucks;
        order.destinyCountry = destinyCountry;
        order.shippingType = shippingType;
        const savedOrder = await this.orderRepository.create(createOrderDto);
        const { discounts, increments, finalPrice } = this.priceCalculatorService.calculate(duck.price, createOrderDto.amountDucks, packageDuck.getPackagingType(), createOrderDto.destinyCountry, createOrderDto.shippingType);
        return new order_response_dto_1.OrderResponseDto(savedOrder.color, savedOrder.size, savedOrder.amountDucks, savedOrder.destinyCountry, savedOrder.shippingType, packageDuck.getPackagingType(), filler, finalPrice, discounts, increments);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [application_exceptions_1.ApplicationExceptions,
        order_repository_1.OrderRepository,
        price_calculator_service_1.PriceCalculatorService,
        duck_repository_1.DuckRepository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map