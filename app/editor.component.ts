import { Component, Input} from '@angular/core';
import {DoodlerComponent} from '../source/doodlercomponent';

@Component({
  selector: 'my-app',
  template: `
  <ng-doodler [cId]="cid" [cWidth]="400" [cHeight]="400" [grayScale]="gray" [sepia]="sepia" [invert]="invert" [brighten]="bright" [contrast]="contrast" [doCrop]="doCrop" [resizer]="resizer"></ng-doodler>`,
  directives:[DoodlerComponent]
})
export class EditorComponent {  
  @Input()
  public cid: string = "doodler";
  @Input()
  gray: number;
  @Input()
  contrast: number;
  @Input()
  invert: boolean;
  @Input()
  bright: number;
  @Input()
  sepia: number;
  @Input()
  resizer: boolean;
  @Input()
  doCrop: boolean;
}