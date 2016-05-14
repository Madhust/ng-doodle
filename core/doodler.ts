import {Effects} from './effects';
import {Cropper} from './cropper'

export class Doodler{
    
    originalEle: HTMLCanvasElement;
    originalContext: CanvasRenderingContext2D;
    hostEle: HTMLCanvasElement;
    hostContext: CanvasRenderingContext2D;
    effects: Effects;
    
    //Private fields
    private _grayScale: number = 0;
    private _invert:boolean = false;
    private _brighten: number = 0;
    private _sepia: number = 0;
    
    constructor(id: string){        
        this.initializeElement(id);
        this.gatherOriginalData();
        this.effects = new Effects(this.getImageData());
    }
    
    //Property initialization
    
    get grayScale(){
        return this._grayScale;
    }
    
    set grayScale(percent: number){
        this._grayScale = percent;
        this.effects.grayScale(percent);
    }
    
    get brighten(){
        return this._brighten;
    }
    
    set brighten(percent: number){
        this._brighten = percent;
        this.effects.brighten(percent);
    }
    
    get invert(){
        return this._invert;
    }
    
    set invert(doIt: boolean){
        this._invert = doIt;
        if(doIt)
          this.effects.invert();
    }
    
    get sepia(){
        return this._sepia;
    }
    
    set sepia(percent: number){
        this._sepia = percent;        
        this.effects.sepia(percent);
    }
    
    //Methods
    
    initializeElement(id: string){
        this.originalEle = <HTMLCanvasElement>document.getElementById(id);
    }
    gatherOriginalData(){
        this.originalContext = this.originalEle.getContext("2d");
        this.hostContext = this.originalEle.getContext("2d");
    }    
    getImageData(): Int8Array{
        return this.hostContext.getImageData(0, 0, this.originalEle.width, this.originalEle.height).data;
    }        
}