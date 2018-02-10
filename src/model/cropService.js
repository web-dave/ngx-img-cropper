"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CropService = (function () {
    function CropService() {
    }
    CropService.prototype.init = function (canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    };
    return CropService;
}());
exports.CropService = CropService;
//# sourceMappingURL=cropService.js.map