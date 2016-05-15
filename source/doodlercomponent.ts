import {Component, Input, AfterViewInit, OnChanges, SimpleChange} from '@angular/core';
import {Doodler} from '../core/doodler';


@Component({
    selector: "ng-doodler",
    templateUrl:"source/doodlercomponent.html"    
})
export class DoodlerComponent implements AfterViewInit, OnChanges {
    
    private ele: SimpleChange; 
        
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
    brighten: number;
    @Input()
    invert: boolean;
    @Input()
    sepia: number;
    @Input()
    contrast: number;
    @Input()
    RGB: number[] = new Array<number>(-1, -1, -1);        
    
    public _doodler: Doodler;
     
    constructor(){                              
    }
    
    ngAfterViewInit(){
        this._doodler = new Doodler(this.cId);
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