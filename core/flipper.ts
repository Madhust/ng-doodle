export class Flipper{
    originalContext: CanvasRenderingContext2D;
    hostContext: CanvasRenderingContext2D;
    
    constructor(public originalEle: HTMLCanvasElement, public imageEle: HTMLImageElement,
    public hostEle: HTMLCanvasElement
    ){
        this.gatherOriginalData();
    }
    
    gatherOriginalData(){
        this.originalContext = this.originalEle.getContext("2d");
        this.hostContext = this.hostEle.getContext("2d");
    } 
    
    horizontalFlip(){
        this.hostContext.translate(this.imageEle.width, 0);
        this.hostContext.scale(-1,1);
        this.hostContext.drawImage(this.imageEle,0, 0, this.imageEle.width, this.imageEle.height);
    }
            
    verticalFlip(){
         this.hostContext.translate(0, this.imageEle.height);
        this.hostContext.scale(1,-1);
        this.hostContext.drawImage(this.imageEle,0, 0, this.imageEle.width, this.imageEle.height);
    }
    
    rotate90deg(){
        
    }
    
    rotate180deg(){
        
    }
    
    rotate270deg(){
        
    }
    rotate360deg(){
        
    }    
}