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
exports.DuckRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const duck_schema_1 = require("../schemas/duck.schema");
let DuckRepository = class DuckRepository {
    constructor(duckModel) {
        this.duckModel = duckModel;
    }
    create(data) {
        const created = new this.duckModel(data);
        return created.save();
    }
    findAll() {
        return this.duckModel
            .find({ isErased: false })
            .sort({ quantity: -1 })
            .exec();
    }
    async findByColorSizeAndPrice(color, size, price) {
        return this.duckModel
            .findOne({ color, size, price, isErased: false })
            .exec();
    }
    async findById(id) {
        const duck = await this.duckModel
            .findOne({ _id: id, isErased: false })
            .exec();
        return duck;
    }
    update(id, data) {
        return this.duckModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async updateQuantity(duck, quantityToAdd) {
        duck.quantity += quantityToAdd;
        return duck.save();
    }
};
exports.DuckRepository = DuckRepository;
exports.DuckRepository = DuckRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(duck_schema_1.Duck.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DuckRepository);
//# sourceMappingURL=duck.repository.js.map