import {Component, Input, AfterViewInit, OnChanges, SimpleChange} from '@angular/core';
import {NgStyle} from '@angular/common';
import {Doodler} from '../core/doodler';


@Component({
    selector: "ng-doodler",
    templateUrl:"source/doodlercomponent.html",
    directives:[NgStyle]    
})
export class DoodlerComponent implements AfterViewInit, OnChanges {
    
    private ele: SimpleChange; 
        
    containerStyles: any = {       
            'width': this.cWidth + "px",
            'height': this.cHeight + "px"
        };
        
    @Input()
    cWidth: number | string;
    @Input()
    cHeight: number | string;    
    @Input()
    cSrc: string;
    @Input()
    cId: string = "doodler";    
    @Input()
    grayScale: number;
    @Input()
    brightness: number;
    @Input()
    invert: boolean;
    @Input()
    sepia: boolean;
    @Input()
    contrast: number;
    @Input()
    RGB: number[] = new Array<number>(-1, -1, -1);        
    @Input()
    imageSrc: string;
    @Input()
    enableCropper: boolean;
    @Input()
    cropDone: boolean;
    @Input()
    verticalFlip: boolean;
    @Input()
    horizontalFlip: boolean;
    
    public _doodler: Doodler;
     
    constructor(){                              
    }
    
    ngAfterViewInit(){
        this._doodler = new Doodler(this.cId, this.imageSrc);
    }
    
    ngOnChanges(changes: { [key: string] : SimpleChange }){
        if(this._doodler == undefined)
         return;
        for(var k in changes){        
            this.ele = changes[k];
            if(this.ele.currentValue === this.ele.previousValue)
             continue;    
            this._doodler[k] = this.ele.currentValue;
        }
    }        
}