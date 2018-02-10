"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var PointPool = (function () {
    function PointPool(initialSize) {
        PointPool._instance = this;
        var prev = (this.firstAvailable = new point_1.Point());
        for (var i = 1; i < initialSize; i++) {
            var p = new point_1.Point();
            prev.next = p;
            prev = p;
        }
    }
    Object.defineProperty(PointPool, "instance", {
        get: function () {
            return PointPool._instance;
        },
        enumerable: true,
        configurable: true
    });
    PointPool.prototype.borrow = function (x, y) {
        if (this.firstAvailable == null) {
            throw "Pool exhausted";
        }
        this.borrowed++;
        var p = this.firstAvailable;
        this.firstAvailable = p.next;
        p.x = x;
        p.y = y;
        return p;
    };
    PointPool.prototype.returnPoint = function (p) {
        this.borrowed--;
        p.x = 0;
        p.y = 0;
        p.next = this.firstAvailable;
        this.firstAvailable = p;
    };
    return PointPool;
}());
exports.PointPool = PointPool;
//# sourceMappingURL=pointPool.js.map