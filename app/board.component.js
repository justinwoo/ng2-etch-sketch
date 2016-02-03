System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var BoardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BoardComponent = (function () {
                function BoardComponent() {
                }
                BoardComponent = __decorate([
                    core_1.Component({
                        selector: 'es-board',
                        template: "\n  <svg\n    [attr.width]=\"props.width\"\n    [attr.height]=\"props.height\"\n    style=\"border: 1px solid black;\"\n  >\n    <rect\n      [attr.width]=\"props.increment\"\n      [attr.height]=\"props.increment\"\n      [attr.x]=\"props.cursor.x * props.increment\"\n      [attr.y]=\"props.cursor.y * props.increment\"\n    ></rect>\n    <g *ngFor=\"#point of props.points\">\n      <rect\n        [attr.width]=\"props.increment\"\n        [attr.height]=\"props.increment\"\n        [attr.x]=\"point.x * props.increment\"\n        [attr.y]=\"point.y * props.increment\"\n      ></rect>\n    </g>\n  </svg>",
                        inputs: ['props']
                    }), 
                    __metadata('design:paramtypes', [])
                ], BoardComponent);
                return BoardComponent;
            })();
            exports_1("BoardComponent", BoardComponent);
        }
    }
});
//# sourceMappingURL=board.component.js.map