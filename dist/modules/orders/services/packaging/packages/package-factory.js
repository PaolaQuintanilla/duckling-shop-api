"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageFactory = void 0;
const wood_package_1 = require("./wood-package");
const cardboard_package_1 = require("./cardboard-package");
const plastic_package_1 = require("./plastic-package");
const size_enum_1 = require("../../../../../common/enums/size.enum");
class PackageFactory {
    static createPackage(size) {
        switch (size) {
            case size_enum_1.SizeEnum.XLarge:
            case size_enum_1.SizeEnum.Large:
                return new wood_package_1.WoodPackage();
            case size_enum_1.SizeEnum.Medium:
                return new cardboard_package_1.CardboardPackage();
            case size_enum_1.SizeEnum.Small:
            case size_enum_1.SizeEnum.XSmall:
                return new plastic_package_1.PlasticPackage();
            default:
                throw new Error('Tamaño no válido');
        }
    }
}
exports.PackageFactory = PackageFactory;
//# sourceMappingURL=package-factory.js.map