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
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/share');
var SpinnerService = (function () {
    function SpinnerService() {
        this.status = new Subject_1.Subject();
        this._active = false;
    }
    Object.defineProperty(SpinnerService.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (v) {
            this._active = v;
            this.status.next(v);
        },
        enumerable: true,
        configurable: true
    });
    SpinnerService.prototype.start = function () {
        this.active = true;
    };
    SpinnerService.prototype.stop = function () {
        this.active = false;
    };
    SpinnerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SpinnerService);
    return SpinnerService;
}());
exports.SpinnerService = SpinnerService;
//# sourceMappingURL=spinner.service.js.map