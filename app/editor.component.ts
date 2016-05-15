import { Component, Input} from '@angular/core';
import {DoodlerComponent} from '../source/doodlercomponent';

@Component({
  selector: 'my-app',
  template: `
  Enable Cropper: <input type="checkbox" [(ngModel)] = "enableCropper"/>
  Crop: <input type="checkbox" [(ngModel)] = "cropDone"/>
  <ng-doodler [cId]="cid" [cWidth]="800" [cHeight]="400" [cropDone]="cropDone" [enableCropper]="enableCropper" [imageSrc]="imageSrc" [grayScale]="grayScale" [brightness]="brightness" [contrast]="contrast" [invert]="invert" [sepia]="sepia"></ng-doodler>`,
  directives:[DoodlerComponent]
})
export class EditorComponent {  
  @Input()
  public cid: string = "doodler";
  @Input()
  grayScale: number;
  @Input()
  contrast: number;
  @Input()
  invert: boolean;
  @Input()
  brightness: number;
  @Input()
  sepia: number;
  @Input()
  enableCropper: boolean;
  @Input()
  cropDone: boolean;
  @Input()
  imageSrc: string;
}