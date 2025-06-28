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
exports.CreateDuckDto = void 0;
const class_validator_1 = require("class-validator");
const size_enum_1 = require("../../../common/enums/size.enum");
const color_enum_1 = require("../../../common/enums/color.enum");
class CreateDuckDto {
}
exports.CreateDuckDto = CreateDuckDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDuckDto.prototype, "duckId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(color_enum_1.ColorEnum, { message: 'bad color' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDuckDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(size_enum_1.SizeEnum, { message: 'bad size' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDuckDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDuckDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDuckDto.prototype, "price", void 0);
//# sourceMappingURL=create-duck.dto.js.map