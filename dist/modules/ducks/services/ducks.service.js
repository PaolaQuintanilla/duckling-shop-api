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
exports.DucksService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const duck_dto_1 = require("../dtos/duck.dto");
const duck_repository_1 = require("../repositories/duck.repository");
const application_exceptions_1 = require("../../../common/exceptions/application.exceptions");
let DucksService = class DucksService {
    constructor(exception, duckRepo) {
        this.exception = exception;
        this.duckRepo = duckRepo;
    }
    async createOrUpdateDuck(createDuckDto) {
        const { color, size, price, quantity } = createDuckDto;
        const existingDuck = await this.duckRepo.findByColorSizeAndPrice(color, size, price);
        if (existingDuck) {
            return this.duckRepo.updateQuantity(existingDuck, quantity);
        }
        else {
            return this.duckRepo.create(createDuckDto);
        }
    }
    async findAll() {
        return this.duckRepo.findAll();
    }
    async findOne(id) {
        const duck = await this.duckRepo.findById(id);
        if (!duck)
            this.exception.notFoundException('Duck not found');
        return (0, class_transformer_1.plainToInstance)(duck_dto_1.DuckDto, duck.toObject());
    }
    async update(id, dto) {
        const duck = await this.duckRepo.update(id, dto);
        if (!duck)
            this.exception.notFoundException('Duck not found');
        return duck;
    }
    async softDeleteDuck(id) {
        const duck = await this.duckRepo.findById(id);
        if (!duck) {
            this.exception.notFoundException(`Duck with id ${id} not found`);
        }
        duck.isErased = true;
        return duck.save();
    }
};
exports.DucksService = DucksService;
exports.DucksService = DucksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [application_exceptions_1.ApplicationExceptions,
        duck_repository_1.DuckRepository])
], DucksService);
//# sourceMappingURL=ducks.service.js.map