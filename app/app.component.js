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
var doodlercomponent_1 = require('../source/doodlercomponent');
var AppComponent = (function () {
    function AppComponent() {
        this.cid = "doodler";
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AppComponent.prototype, "cid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AppComponent.prototype, "gray", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AppComponent.prototype, "contrast", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AppComponent.prototype, "invert", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AppComponent.prototype, "bright", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AppComponent.prototype, "sepia", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AppComponent.prototype, "resizer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AppComponent.prototype, "doCrop", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: " <input type='text' [(ngModel)]='gray'/>\n  <input type=\"checkbox\" [(ngModel)]='invert'/>\n  <ng-doodler [cId]=\"cid\" [cWidth]=\"400\" [cHeight]=\"400\" [grayScale]=\"gray\" [sepia]=\"sepia\" [invert]=\"invert\" [brighten]=\"bright\" [contrast]=\"contrast\" [doCrop]=\"doCrop\" [resizer]=\"resizer\"></ng-doodler>",
            directives: [doodlercomponent_1.DoodlerComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map