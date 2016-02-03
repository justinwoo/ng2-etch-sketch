System.register(['angular2/core', 'rxjs/Rx', './board.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1, board_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (board_component_1_1) {
                board_component_1 = board_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    var _this = this;
                    this.config = {
                        width: 800,
                        height: 600,
                        increment: 10
                    };
                    this.initState = {
                        points: new Set(),
                        cursor: {
                            x: 0,
                            y: 0
                        }
                    };
                    this.upInputs = [38, 75];
                    this.downInputs = [40, 74];
                    this.leftInputs = [37, 72];
                    this.rightInputs = [39, 76];
                    this.up = 'up';
                    this.down = 'down';
                    this.left = 'left';
                    this.right = 'right';
                    this.mappings = [
                        [this.upInputs, this.up],
                        [this.downInputs, this.down],
                        [this.leftInputs, this.left],
                        [this.rightInputs, this.right],
                    ];
                    this.keyDirection$ = Rx_1.Observable
                        .fromEvent(window, 'keydown')
                        .map(function (_a) {
                        var keyCode = _a.keyCode;
                        for (var i = 0; i < _this.mappings.length; i++) {
                            var _b = _this.mappings[i], inputs = _b[0], direction = _b[1];
                            if (inputs.indexOf(keyCode) !== -1) {
                                return direction;
                            }
                        }
                    });
                    this.state$ = Rx_1.Observable
                        .merge(this.moveCursor(this.keyDirection$))
                        .startWith(this.initState)
                        .scan(function (state, project) { return project(state); });
                    this.state$.subscribe(function (state) {
                        _this.props = Object.assign({}, state, _this.config);
                    });
                }
                AppComponent.prototype.moveCursor = function (keyboard$) {
                    var _this = this;
                    return keyboard$
                        .map(function (direction) {
                        return function (state) {
                            if (!direction)
                                return state;
                            var _a = _this.config, increment = _a.increment, width = _a.width, height = _a.height;
                            var _b = state.cursor, x = _b.x, y = _b.y;
                            // TODO: fix incorrect Set constructor definition in es6-shim tsd?
                            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
                            // Set is iterable and should be useable for the constructor?
                            // Looks like there's a PR for this already: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/7905
                            var points = (new Set(state.points.values())).add({ x: x, y: y });
                            switch (direction) {
                                case _this.up:
                                    y--;
                                    break;
                                case _this.down:
                                    y++;
                                    break;
                                case _this.left:
                                    x--;
                                    break;
                                case _this.right:
                                    x++;
                                    break;
                            }
                            if (x < 0 || (increment * x) > (width - increment) ||
                                y < 0 || (increment * y) > (height - increment)) {
                                return state;
                            }
                            return Object.assign({}, state, {
                                points: points,
                                cursor: { x: x, y: y }
                            });
                        };
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n  <div>\n    <h1>babby's first ng2 app</h1>\n    <es-board [props]=\"props\"></es-board>\n  </div>",
                        directives: [board_component_1.BoardComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map