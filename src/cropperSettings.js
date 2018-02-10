"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cropperDrawSettings_1 = require("./cropperDrawSettings");
var CropperSettings = (function () {
    function CropperSettings(settings) {
        this.canvasWidth = 300;
        this.canvasHeight = 300;
        this.dynamicSizing = false;
        this.width = 200;
        this.height = 200;
        this.minWidth = 50;
        this.minHeight = 50;
        this.minWithRelativeToResolution = true;
        this.croppedWidth = 100;
        this.croppedHeight = 100;
        this.cropperDrawSettings = new cropperDrawSettings_1.CropperDrawSettings();
        this.touchRadius = 20;
        this.noFileInput = false;
        this.markerSizeMultiplier = 1;
        this.centerTouchRadius = 20;
        this.showCenterMarker = true;
        this.allowedFilesRegex = /\.(jpe?g|png|gif|bmp)$/i;
        this.cropOnResize = true;
        this.preserveSize = false;
        this.compressRatio = 1.0;
        this._rounded = false;
        this._keepAspect = true;
        if (typeof settings === "object") {
            this.canvasWidth = settings.canvasWidth || this.canvasWidth;
            this.canvasHeight = settings.canvasHeight || this.canvasHeight;
            this.width = settings.width || this.width;
            this.height = settings.height || this.height;
            this.minWidth = settings.minWidth || this.minWidth;
            this.minHeight = settings.minHeight || this.minHeight;
            this.minWithRelativeToResolution =
                settings.minWithRelativeToResolution ||
                    this.minWithRelativeToResolution;
            this.croppedWidth = settings.croppedWidth || this.croppedWidth;
            this.croppedHeight = settings.croppedHeight || this.croppedHeight;
            this.touchRadius = settings.touchRadius || this.touchRadius;
            this.cropperDrawSettings =
                settings.cropperDrawSettings || this.cropperDrawSettings;
            this.noFileInput = settings.noFileInput || this.noFileInput;
            this.allowedFilesRegex =
                settings.allowedFilesRegex || this.allowedFilesRegex;
            this.rounded = settings.rounded || this.rounded;
            this.keepAspect = settings.keepAspect || this.keepAspect;
            this.preserveSize = settings.preserveSize || this.preserveSize;
            this.cropOnResize = settings.cropOnResize || this.cropOnResize;
            this.compressRatio = settings.compressRatio || this.compressRatio;
            this.cropperDrawSettings =
                settings.cropperDrawSettings || this.cropperDrawSettings;
        }
    }
    Object.defineProperty(CropperSettings.prototype, "rounded", {
        get: function () {
            return this._rounded;
        },
        set: function (val) {
            this._rounded = val;
            if (val) {
                this._keepAspect = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CropperSettings.prototype, "keepAspect", {
        get: function () {
            return this._keepAspect;
        },
        set: function (val) {
            if (val === false && this._rounded) {
                throw new Error("Cannot set keep aspect to false on rounded cropper. Ellipsis not supported");
            }
            this._keepAspect = val;
        },
        enumerable: true,
        configurable: true
    });
    return CropperSettings;
}());
exports.CropperSettings = CropperSettings;
//# sourceMappingURL=cropperSettings.js.map