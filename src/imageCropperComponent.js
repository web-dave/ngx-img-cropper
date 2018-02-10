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
var core_1 = require("@angular/core");
var imageCropper_1 = require("./imageCropper");
var cropperSettings_1 = require("./cropperSettings");
var exif_1 = require("./exif");
var cropPosition_1 = require("./model/cropPosition");
var ImageCropperComponent = (function () {
    function ImageCropperComponent(renderer) {
        this.cropPositionChange = new core_1.EventEmitter();
        this.onCrop = new core_1.EventEmitter();
        this.renderer = renderer;
    }
    ImageCropperComponent.prototype.ngAfterViewInit = function () {
        var canvas = this.cropcanvas.nativeElement;
        if (!this.settings) {
            this.settings = new cropperSettings_1.CropperSettings();
        }
        if (this.settings.cropperClass) {
            this.renderer.setAttribute(canvas, "class", this.settings.cropperClass);
        }
        if (!this.settings.dynamicSizing) {
            this.renderer.setAttribute(canvas, "width", this.settings.canvasWidth.toString());
            this.renderer.setAttribute(canvas, "height", this.settings.canvasHeight.toString());
        }
        else {
            this.windowListener = this.resize.bind(this);
            window.addEventListener("resize", this.windowListener);
        }
        if (!this.cropper) {
            this.cropper = new imageCropper_1.ImageCropper(this.settings);
        }
        this.cropper.prepare(canvas);
    };
    ImageCropperComponent.prototype.ngOnChanges = function (changes) {
        if (this.isCropPositionChanged(changes)) {
            this.cropper.updateCropPosition(this.cropPosition.toBounds());
            if (this.cropper.isImageSet()) {
                var bounds = this.cropper.getCropBounds();
                this.image.image = this.cropper.getCroppedImageHelper().src;
                this.onCrop.emit(bounds);
            }
            this.updateCropBounds();
        }
        if (changes.inputImage) {
            this.setImage(changes.inputImage.currentValue);
        }
    };
    ImageCropperComponent.prototype.ngOnDestroy = function () {
        if (this.settings.dynamicSizing && this.windowListener) {
            window.removeEventListener("resize", this.windowListener);
        }
    };
    ImageCropperComponent.prototype.onTouchMove = function (event) {
        this.cropper.onTouchMove(event);
    };
    ImageCropperComponent.prototype.onTouchStart = function (event) {
        this.cropper.onTouchStart(event);
    };
    ImageCropperComponent.prototype.onTouchEnd = function (event) {
        this.cropper.onTouchEnd(event);
        if (this.cropper.isImageSet()) {
            this.image.image = this.cropper.getCroppedImageHelper().src;
            this.onCrop.emit(this.cropper.getCropBounds());
            this.updateCropBounds();
        }
    };
    ImageCropperComponent.prototype.onMouseDown = function (event) {
        this.cropper.onMouseDown(event);
    };
    ImageCropperComponent.prototype.onMouseUp = function (event) {
        if (this.cropper.isImageSet()) {
            this.cropper.onMouseUp(event);
            this.image.image = this.cropper.getCroppedImageHelper().src;
            this.onCrop.emit(this.cropper.getCropBounds());
            this.updateCropBounds();
        }
        else if (!this.settings.noFileInput) {
            this.fileInput.nativeElement.click();
        }
    };
    ImageCropperComponent.prototype.onMouseMove = function (event) {
        this.cropper.onMouseMove(event);
    };
    ImageCropperComponent.prototype.fileChangeListener = function ($event) {
        var _this = this;
        if ($event.target.files.length === 0)
            return;
        var file = $event.target.files[0];
        if (this.settings.allowedFilesRegex.test(file.name)) {
            var image_1 = new Image();
            var fileReader = new FileReader();
            fileReader.addEventListener("loadend", function (loadEvent) {
                image_1.addEventListener("load", function () {
                    _this.setImage(image_1);
                });
                image_1.src = loadEvent.target.result;
            });
            fileReader.readAsDataURL(file);
        }
    };
    ImageCropperComponent.prototype.resize = function () {
        var canvas = this.cropcanvas.nativeElement;
        this.settings.canvasWidth = canvas.offsetWidth;
        this.settings.canvasHeight = canvas.offsetHeight;
        this.cropper.resizeCanvas(canvas.offsetWidth, canvas.offsetHeight, true);
    };
    ImageCropperComponent.prototype.reset = function () {
        this.cropper.reset();
        this.renderer.setAttribute(this.cropcanvas.nativeElement, "class", this.settings.cropperClass);
        this.image.image = this.cropper.getCroppedImageHelper().src;
    };
    ImageCropperComponent.prototype.setImage = function (image, newBounds) {
        var _this = this;
        if (newBounds === void 0) { newBounds = null; }
        this.renderer.setAttribute(this.cropcanvas.nativeElement, "class", this.settings.cropperClass + " " + this.settings.croppingClass);
        this.raf = window.requestAnimationFrame(function () {
            if (_this.raf) {
                window.cancelAnimationFrame(_this.raf);
            }
            if (image.naturalHeight > 0 && image.naturalWidth > 0) {
                image.height = image.naturalHeight;
                image.width = image.naturalWidth;
                window.cancelAnimationFrame(_this.raf);
                _this.getOrientedImage(image, function (img) {
                    if (_this.settings.dynamicSizing) {
                        var canvas = _this.cropcanvas.nativeElement;
                        _this.settings.canvasWidth = canvas.offsetWidth;
                        _this.settings.canvasHeight = canvas.offsetHeight;
                        _this.cropper.resizeCanvas(canvas.offsetWidth, canvas.offsetHeight, false);
                    }
                    _this.cropper.setImage(img);
                    if (_this.cropPosition && _this.cropPosition.isInitialized()) {
                        _this.cropper.updateCropPosition(_this.cropPosition.toBounds());
                    }
                    _this.image.original = img;
                    var bounds = _this.cropper.getCropBounds();
                    _this.image.image = _this.cropper.getCroppedImageHelper().src;
                    if (!_this.image) {
                        _this.image = image;
                    }
                    if (newBounds != null) {
                        bounds = newBounds;
                        _this.cropper.setBounds(bounds);
                        _this.cropper.updateCropPosition(bounds);
                    }
                    _this.onCrop.emit(bounds);
                });
            }
        });
    };
    ImageCropperComponent.prototype.isCropPositionChanged = function (changes) {
        if (this.cropper &&
            changes["cropPosition"] &&
            this.isCropPositionUpdateNeeded) {
            return true;
        }
        else {
            this.isCropPositionUpdateNeeded = true;
            return false;
        }
    };
    ImageCropperComponent.prototype.updateCropBounds = function () {
        var cropBound = this.cropper.getCropBounds();
        this.cropPositionChange.emit(new cropPosition_1.CropPosition(cropBound.left, cropBound.top, cropBound.width, cropBound.height));
        this.isCropPositionUpdateNeeded = false;
    };
    ImageCropperComponent.prototype.getOrientedImage = function (image, callback) {
        var img;
        exif_1.Exif.getData(image, function () {
            var orientation = exif_1.Exif.getTag(image, "Orientation");
            if ([3, 6, 8].indexOf(orientation) > -1) {
                var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), cw = image.width, ch = image.height, cx = 0, cy = 0, deg = 0;
                switch (orientation) {
                    case 3:
                        cx = -image.width;
                        cy = -image.height;
                        deg = 180;
                        break;
                    case 6:
                        cw = image.height;
                        ch = image.width;
                        cy = -image.height;
                        deg = 90;
                        break;
                    case 8:
                        cw = image.height;
                        ch = image.width;
                        cx = -image.width;
                        deg = 270;
                        break;
                    default:
                        break;
                }
                canvas.width = cw;
                canvas.height = ch;
                ctx.rotate(deg * Math.PI / 180);
                ctx.drawImage(image, cx, cy);
                img = document.createElement("img");
                img.width = cw;
                img.height = ch;
                img.addEventListener("load", function () {
                    callback(img);
                });
                img.src = canvas.toDataURL("image/png");
            }
            else {
                img = image;
                callback(img);
            }
        });
    };
    __decorate([
        core_1.ViewChild("cropcanvas", undefined),
        __metadata("design:type", core_1.ElementRef)
    ], ImageCropperComponent.prototype, "cropcanvas", void 0);
    __decorate([
        core_1.ViewChild("fileInput"),
        __metadata("design:type", core_1.ElementRef)
    ], ImageCropperComponent.prototype, "fileInput", void 0);
    __decorate([
        core_1.Input("settings"),
        __metadata("design:type", cropperSettings_1.CropperSettings)
    ], ImageCropperComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Input("image"),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "image", void 0);
    __decorate([
        core_1.Input("inputImage"),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "inputImage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", imageCropper_1.ImageCropper)
    ], ImageCropperComponent.prototype, "cropper", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", cropPosition_1.CropPosition)
    ], ImageCropperComponent.prototype, "cropPosition", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ImageCropperComponent.prototype, "cropPositionChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ImageCropperComponent.prototype, "onCrop", void 0);
    ImageCropperComponent = __decorate([
        core_1.Component({
            selector: "img-cropper",
            template: "\n        <span class=\"ng2-imgcrop\">\n          <input *ngIf=\"!settings.noFileInput\" #fileInput type=\"file\" accept=\"image/*\" (change)=\"fileChangeListener($event)\">\n          <canvas #cropcanvas\n                  (mousedown)=\"onMouseDown($event)\"\n                  (mouseup)=\"onMouseUp($event)\"\n                  (mousemove)=\"onMouseMove($event)\"\n                  (mouseleave)=\"onMouseUp($event)\"\n                  (touchmove)=\"onTouchMove($event)\"\n                  (touchend)=\"onTouchEnd($event)\"\n                  (touchstart)=\"onTouchStart($event)\">\n          </canvas>\n        </span>\n      "
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], ImageCropperComponent);
    return ImageCropperComponent;
}());
exports.ImageCropperComponent = ImageCropperComponent;
//# sourceMappingURL=imageCropperComponent.js.map