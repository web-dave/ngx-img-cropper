"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var handle_1 = require("./handle");
var CornerMarker = (function (_super) {
    __extends(CornerMarker, _super);
    function CornerMarker(x, y, radius, cropperSettings) {
        return _super.call(this, x, y, radius, cropperSettings) || this;
    }
    CornerMarker.prototype.drawCornerBorder = function (ctx) {
        var sideLength = 10;
        if (this.over || this.drag) {
            sideLength = 12;
        }
        var hDirection = this.cropperSettings.markerSizeMultiplier;
        var vDirection = this.cropperSettings.markerSizeMultiplier;
        if (this.horizontalNeighbour.position.x < this.position.x) {
            hDirection = -this.cropperSettings.markerSizeMultiplier;
        }
        if (this.verticalNeighbour.position.y < this.position.y) {
            vDirection = -this.cropperSettings.markerSizeMultiplier;
        }
        if (this.cropperSettings.rounded) {
            var width = this.position.x - this.horizontalNeighbour.position.x;
            var height = this.position.y - this.verticalNeighbour.position.y;
            var offX = Math.round(Math.sin(Math.PI / 2) * Math.abs(width / 2)) / 4;
            var offY = Math.round(Math.sin(Math.PI / 2) * Math.abs(height / 2)) / 4;
            this.offset.x = hDirection > 0 ? offX : -offX;
            this.offset.y = vDirection > 0 ? offY : -offY;
        }
        else {
            this.offset.x = 0;
            this.offset.y = 0;
        }
        ctx.beginPath();
        if (this.cropperSettings.cropperDrawSettings.lineDash) {
            ctx.setLineDash([1, 3]);
        }
        ctx.lineJoin = "miter";
        ctx.moveTo(this.position.x + this.offset.x, this.position.y + this.offset.y);
        ctx.lineTo(this.position.x + this.offset.x + sideLength * hDirection, this.position.y + this.offset.y);
        ctx.lineTo(this.position.x + this.offset.x + sideLength * hDirection, this.position.y + this.offset.y + sideLength * vDirection);
        ctx.lineTo(this.position.x + this.offset.x, this.position.y + this.offset.y + sideLength * vDirection);
        ctx.lineTo(this.position.x + this.offset.x, this.position.y + this.offset.y);
        ctx.closePath();
        ctx.lineWidth = this.cropperSettings.cropperDrawSettings.strokeWidth;
        ctx.strokeStyle =
            this.cropperSettings.cropperDrawSettings.strokeColor ||
                "rgba(255,255,255,.7)";
        ctx.stroke();
    };
    CornerMarker.prototype.drawCornerFill = function (ctx) {
        var sideLength = 10;
        if (this.over || this.drag) {
            sideLength = 12;
        }
        var hDirection = this.cropperSettings.markerSizeMultiplier;
        var vDirection = this.cropperSettings.markerSizeMultiplier;
        if (this.horizontalNeighbour.position.x < this.position.x) {
            hDirection = -this.cropperSettings.markerSizeMultiplier;
        }
        if (this.verticalNeighbour.position.y < this.position.y) {
            vDirection = -this.cropperSettings.markerSizeMultiplier;
        }
        ctx.beginPath();
        if (this.cropperSettings.cropperDrawSettings.lineDash) {
            ctx.setLineDash([1, 3]);
        }
        ctx.moveTo(this.position.x + this.offset.x, this.position.y + this.offset.y);
        ctx.lineTo(this.position.x + this.offset.x + sideLength * hDirection, this.position.y + this.offset.y);
        ctx.lineTo(this.position.x + this.offset.x + sideLength * hDirection, this.position.y + this.offset.y + sideLength * vDirection);
        ctx.lineTo(this.position.x + this.offset.x, this.position.y + this.offset.y + sideLength * vDirection);
        ctx.lineTo(this.position.x + this.offset.x, this.position.y + this.offset.y);
        ctx.closePath();
        ctx.fillStyle =
            this.cropperSettings.cropperDrawSettings.strokeColor ||
                "rgba(255,255,255,.7)";
        ctx.fill();
    };
    CornerMarker.prototype.moveX = function (x) {
        this.setPosition(x, this.position.y);
    };
    CornerMarker.prototype.moveY = function (y) {
        this.setPosition(this.position.x, y);
    };
    CornerMarker.prototype.move = function (x, y) {
        this.setPosition(x, y);
        this.verticalNeighbour.moveX(x);
        this.horizontalNeighbour.moveY(y);
    };
    CornerMarker.prototype.addHorizontalNeighbour = function (neighbour) {
        this.horizontalNeighbour = neighbour;
    };
    CornerMarker.prototype.addVerticalNeighbour = function (neighbour) {
        this.verticalNeighbour = neighbour;
    };
    CornerMarker.prototype.getHorizontalNeighbour = function () {
        return this.horizontalNeighbour;
    };
    CornerMarker.prototype.getVerticalNeighbour = function () {
        return this.verticalNeighbour;
    };
    CornerMarker.prototype.draw = function (ctx) {
        this.drawCornerFill(ctx);
        this.drawCornerBorder(ctx);
    };
    return CornerMarker;
}(handle_1.Handle));
exports.CornerMarker = CornerMarker;
//# sourceMappingURL=cornerMarker.js.map