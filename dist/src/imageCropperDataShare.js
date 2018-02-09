var ImageCropperDataShare = /** @class */ (function () {
    function ImageCropperDataShare() {
    }
    ImageCropperDataShare.setPressed = function (canvas) {
        this.pressed = canvas;
    };
    ImageCropperDataShare.setReleased = function (canvas) {
        if (canvas === this.pressed) {
            //  this.pressed = undefined;
        }
    };
    ImageCropperDataShare.setOver = function (canvas) {
        this.over = canvas;
    };
    ImageCropperDataShare.setStyle = function (canvas, style) {
        if (this.pressed !== undefined) {
            if (this.pressed === canvas) {
                // TODO: check this
                // angular.element(document.documentElement).css('cursor', style);
            }
        }
        else {
            if (canvas === this.over) {
                // TODO: check this
                // angular.element(document.documentElement).css('cursor', style);
            }
        }
    };
    ImageCropperDataShare.share = {};
    return ImageCropperDataShare;
}());
export { ImageCropperDataShare };
//# sourceMappingURL=imageCropperDataShare.js.map