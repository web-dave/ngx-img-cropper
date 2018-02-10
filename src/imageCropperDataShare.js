"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageCropperDataShare = (function () {
    function ImageCropperDataShare() {
    }
    ImageCropperDataShare.setPressed = function (canvas) {
        this.pressed = canvas;
    };
    ImageCropperDataShare.setReleased = function (canvas) {
        if (canvas === this.pressed) {
        }
    };
    ImageCropperDataShare.setOver = function (canvas) {
        this.over = canvas;
    };
    ImageCropperDataShare.setStyle = function (canvas, style) {
        if (this.pressed !== undefined) {
            if (this.pressed === canvas) {
            }
        }
        else {
            if (canvas === this.over) {
            }
        }
    };
    ImageCropperDataShare.share = {};
    return ImageCropperDataShare;
}());
exports.ImageCropperDataShare = ImageCropperDataShare;
//# sourceMappingURL=imageCropperDataShare.js.map