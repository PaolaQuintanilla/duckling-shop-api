"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDuckDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_duck_dto_1 = require("./create-duck.dto");
class UpdateDuckDto extends (0, mapped_types_1.PartialType)(create_duck_dto_1.CreateDuckDto) {
}
exports.UpdateDuckDto = UpdateDuckDto;
//# sourceMappingURL=update-duck.dto.js.map