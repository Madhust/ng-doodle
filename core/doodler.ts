import {Effects} from './effects';
import {Cropper} from './cropper'

export class Doodler{
    
    originalEle: HTMLCanvasElement;
    originalContext: CanvasRenderingContext2D;
    hostEle: HTMLCanvasElement;
    hostContext: CanvasRenderingContext2D;
    effects: Effects;
    cropper: Cropper;
    
    //Private fields
    private _grayScale: number = 0;
    private _invert:boolean = false;
    private _brighten: number = 0;
    private _sepia: number = 0;
    private _contrast: number = 0;
    
    constructor(id: string){        
        this.initializeElement(id);
        this.createHostElement();    
        this.gatherOriginalData();
        this.hostContext.drawImage(this.originalEle, 0, 0);
        this.effects = new Effects();
        this.cropper = new Cropper();
    }
    
    //Property initialization
    
    get grayScale(){
        return this._grayScale;
    }
    
    set grayScale(percent: number){
        this._grayScale = percent;  
        this.applyOriginal()     
        this.putImageData(this.effects.grayScale(this.getImageData(), percent));
    }
    
    get brighten(){
        return this._brighten;
    }
    
    set brighten(percent: number){
        this._brighten = percent;
        this.applyOriginal();     
        this.putImageData(this.effects.brighten(this.getImageData(), percent));        
    }
    
    get invert(){
        return this._invert;
    }
    
    set invert(doIt: boolean){
        this._invert = doIt;
        this.applyOriginal();            
        if(doIt)
           this.putImageData(this.effects.invert(this.getImageData()));
    }
    
    get sepia(){
        return this._sepia;
    }
    
    set sepia(percent: number){
        this._sepia = percent;        
        this.applyOriginal();     
        this.putImageData(this.effects.sepia(this.getImageData(), percent));
    }
    
     get contrast(){
        return this._contrast;
    }
    
    set contrast(percent: number){
        this._contrast = percent;        
        this.applyOriginal();     
        this.putImageData(this.effects.contrast(this.getImageData(), percent));
    }
    
    //Methods
    
    initializeElement(id: string){
        this.originalEle = <HTMLCanvasElement>document.getElementById(id);            
    }
    createHostElement(){
        this.hostEle = <HTMLCanvasElement>document.createElement("canvas");
        this.hostEle.width = this.originalEle.width;
        this.hostEle.height = this.originalEle.height; 
        this.hostEle.id = this.originalEle.id + "_host";
        this.originalEle.parentElement.appendChild(this.hostEle);
        this.originalEle.style.display = "none";           
    }
    gatherOriginalData(){
        this.originalContext = this.originalEle.getContext("2d");
        this.hostContext = this.hostEle.getContext("2d");
    }    
    getImageData(): ImageData{
        return this.hostContext.getImageData(0, 0, this.originalEle.width, this.originalEle.height);
    }
    
    applyOriginal(){
        this.hostContext.putImageData(this.originalContext.getImageData(0, 0, this.originalEle.width, this.originalEle.height), 0, 0);
    }
    
    putImageData(data: ImageData){
        this.hostContext.putImageData(data, 0, 0);
    }         
}