import {Component, Input, OnInit, SimpleChange} from 'angular/core';
import {Doodler} from '../core/doodler';


@Component({
    selector: "ng-doodler",
    template:"doodlercomponent.html"    
})
export class DoodlerComponent implements OnInit{    

    width: number | string;
    height: number | string;    
    src: string;
    
    id: string = "doodler";
    
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
    
    public _doodler: Doodler = new Doodler(this.id);
     
    constructor(){                              
    }
    
    ngAfterContentInit(){
        this._doodler = new Doodler(this.id);
    }
    
    ngOnChange(changes: { [key: string] : SimpleChange }){
        for(var k in changes){
            this._doodler[k] = changes[k];
        }
    }
}