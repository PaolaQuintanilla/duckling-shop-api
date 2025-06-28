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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DucksController = void 0;
const common_1 = require("@nestjs/common");
const ducks_service_1 = require("../services/ducks.service");
const create_duck_dto_1 = require("../dtos/create-duck.dto");
const update_duck_dto_1 = require("../dtos/update-duck.dto");
let DucksController = class DucksController {
    constructor(ducksService) {
        this.ducksService = ducksService;
    }
    create(dto) {
        return this.ducksService.createOrUpdateDuck(dto);
    }
    findAll() {
        return this.ducksService.findAll();
    }
    findOne(id) {
        return this.ducksService.findOne(id);
    }
    update(id, dto) {
        return this.ducksService.update(id, dto);
    }
    async eraseDuck(id) {
        const duck = await this.ducksService.softDeleteDuck(id);
        return { message: `Duck with id ${id} has been marked as erased`, duck };
    }
};
exports.DucksController = DucksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_duck_dto_1.CreateDuckDto]),
    __metadata("design:returntype", void 0)
], DucksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DucksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DucksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_duck_dto_1.UpdateDuckDto]),
    __metadata("design:returntype", void 0)
], DucksController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/erase'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DucksController.prototype, "eraseDuck", null);
exports.DucksController = DucksController = __decorate([
    (0, common_1.Controller)('ducks'),
    __metadata("design:paramtypes", [ducks_service_1.DucksService])
], DucksController);
//# sourceMappingURL=ducks.controller.js.map