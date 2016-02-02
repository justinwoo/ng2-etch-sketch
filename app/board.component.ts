import {Component} from 'angular2/core';
import {Props} from './app.component';

@Component({
  selector: 'es-board',
  template: `
  <svg
    [attr.width]="props.width"
    [attr.height]="props.height"
    style="border: 1px solid black;"
  >
    <rect
      [attr.width]="props.increment"
      [attr.height]="props.increment"
      [attr.x]="props.cursor.x * props.increment"
      [attr.y]="props.cursor.y * props.increment"
    ></rect>
    <g *ngFor="#point of props.points">
      <rect
        [attr.width]="props.increment"
        [attr.height]="props.increment"
        [attr.x]="point.x * props.increment"
        [attr.y]="point.y * props.increment"
      ></rect>
    </g>
  </svg>`,
  inputs: ['props']
})

export class BoardComponent {
  public props: Props;
}