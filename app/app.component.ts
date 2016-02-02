import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {BoardComponent} from './board.component';

type Coords = {
  x: number,
  y: number
}

type Config = {
  width: number,
  height: number,
  increment: number
}

type State = {
  points: Set<Coords>,
  cursor: Coords
}

type Project = (State) => State;

export type Props = State & Config;

@Component({
  selector: 'my-app',
  template: `
  <div>
    <h1>babby's first ng2 app</h1>
    <es-board [props]="props"></es-board>
  </div>`,
  directives: [BoardComponent]
})

export class AppComponent {
  private props: Props;

  private config: Config = {
    width: 800,
    height: 600,
    increment: 10
  };

  private initState: State = {
    points: new Set<Coords>(),
    cursor: {
      x: 0,
      y: 0
    }
  };

  private upInputs = [38, 75];
  private downInputs = [40, 74];
  private leftInputs = [37, 72];
  private rightInputs = [39, 76];

  private up = 'up';
  private down = 'down';
  private left = 'left';
  private right = 'right';

  private mappings: [number[], string][] = [
    [this.upInputs, this.up],
    [this.downInputs, this.down],
    [this.leftInputs, this.left],
    [this.rightInputs, this.right],
  ];

  private keyDirection$ = Observable
    .fromEvent<KeyboardEvent>(window, 'keydown')
    .map(({keyCode}) => {
      for (let i = 0; i < this.mappings.length; i++) {
        const [inputs, direction] = this.mappings[i];

        if (inputs.indexOf(keyCode) !== -1) {
          return direction;
        }
      }
    });

  private moveCursor(keyboard$): Observable<Project> {
    return keyboard$
      .map((direction) =>
        (state: State) => {
          if (!direction) return state;

          const {increment, width, height} = this.config;
          let {x, y} = state.cursor;
          // TODO: fix incorrect Set constructor definition in es6-shim tsd?
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
          // Set is iterable and should be useable for the constructor?
          // Looks like there's a PR for this already: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/7905
          const points = (new Set(state.points.values())).add({x, y});

          switch (direction) {
            case this.up:
              y--;
              break;
            case this.down:
              y++;
              break;
            case this.left:
              x--;
              break;
            case this.right:
              x++;
              break;
          }

          if (x < 0 || (increment * x) > (width - increment) ||
            y < 0 || (increment * y) > (height - increment)) {
            return state;
          }

          return Object.assign({}, state, {
            points,
            cursor: {x, y}
          });
        });
  }

  private state$: Observable<State> = Observable
    .merge(
      this.moveCursor(this.keyDirection$)
    )
    .startWith(this.initState)
    .scan((state, project: Project) => project(state));

  constructor() {
    this.state$.subscribe((state) => {
      this.props = Object.assign({}, state, this.config);
    });
  }
}
