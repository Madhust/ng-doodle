import {Effects} from './effects';
import {Cropper} from './cropper';
import {Flipper} from './flipper';

export class Doodler{
    
    originalEle: HTMLCanvasElement;
    originalContext: CanvasRenderingContext2D;
    hostEle: HTMLCanvasElement;
    hostContext: CanvasRenderingContext2D;
    imageEle: HTMLImageElement;
    effects: Effects;
    cropper: Cropper;
    flipper :Flipper; 
    //Private fields
    private _grayScale: number = 0;
    private _invert:boolean = false;
    private _brighten: number = 0;
    private _sepia: boolean = false;
    private _contrast: number = 0;
    private _imageSrc: string = "";
    private _enableCrop: boolean = false;
    private _cropDone: boolean = false;
    private _hFlip: boolean = false;
    private _vFlip: boolean = false;
    
    
    constructor(id: string, src?: string){        
        this.initializeElement(id);
        this._imageSrc = src;
        this.createHostElement();           
        this.gatherOriginalData();  
        this.createHostImage();       
        this.hostContext.drawImage(this.imageEle, 0, 0);
        this.effects = new Effects();
        this.cropper = new Cropper(this.imageEle);
        this.flipper = new Flipper(this.originalEle, this.imageEle, this.hostEle);
    }
    
    //Property initialization
    
    get grayScale(){
        return this._grayScale;
    }
    
    set grayScale(percent: number){
        this._grayScale = percent;  
        this.applyOriginal();     
        this.putImageData(this.effects.grayScale(this.getImageData(), percent));
    }
    
    get enableCropper(){
        return this._enableCrop;
    }
    
    set enableCropper(bl: boolean){
        this._enableCrop = bl;
        this.cropper.cropImg();
    }
    
    get cropDone(){
        return this._cropDone;
    }
    
    set cropDone(bl: boolean){
        this._cropDone = bl;
        this.cropper.cropDoneImg();
    }
    
    get brightness(){
        return this._brighten;
    }
    
    set brightness(percent: number){
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
    
    set sepia(percent: boolean){
        this._sepia = percent;        
        this.applyOriginal();  
        if(percent)   
            this.putImageData(this.effects.sepia(this.getImageData(), 100));
    }
    
     get contrast(){
        return this._contrast;
    }
    
    set contrast(percent: number){
        this._contrast = percent;        
        this.applyOriginal();     
        this.putImageData(this.effects.contrast(this.getImageData(), percent));
    }
    
    get imageSrc(){
      return this._imageSrc;    
    }
    set imageSrc(value: string){
        this._imageSrc = value;
        this.createHostImage();
    }
    
    get horizontalFlip(){
        return this._hFlip;
    }
    
    set horizontalFlip(value: boolean){
        this._hFlip = value;
        this.flipper.horizontalFlip();
    }
    get verticalFlip(){
        return this._vFlip;
    }
    
    set verticalFlip(value: boolean){
        this._vFlip = value;
        this.flipper.verticalFlip();
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
    createHostImage(){
        var img = document.getElementById(this.originalEle.id + "_hostimage");
        if(img != null || img != undefined)
           img.parentElement.removeChild(img);
        this.imageEle = new Image(this.originalEle.width, this.originalEle.height);
        this.imageEle.onload= ()=> {
        this.imageEle.id = this.originalEle.id + "_hostimage"; 
        this.applyOriginal(true);     
        }
        this.imageEle.src = this.imageSrc;         
    }
    gatherOriginalData(){
        this.originalContext = this.originalEle.getContext("2d");
        this.hostContext = this.hostEle.getContext("2d");
    }    
    getImageData(): ImageData{
        return this.hostContext.getImageData(0, 0, this.originalEle.width, this.originalEle.height);
    }    
    applyOriginal(first?: boolean){        
           this.hostContext.drawImage(this.imageEle, 0, 0, this.originalEle.width, this.originalEle.height);        
        if(first) 
           this.originalContext.drawImage(this.imageEle, 0, 0, this.hostEle.width, this.hostEle.height);              
    }
    
    putImageData(data: ImageData){
       setTimeout(()=>{this.hostContext.putImageData(data, 0, 0); }, 0); 
    }         
}