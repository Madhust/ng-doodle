import { bootstrap }    from '@angular/platform-browser-dynamic';
import { Component,AfterViewInit } from '@angular/core';
import { EditorComponent } from './editor.component';

/**
 * MainComponent
 */
@Component({
    selector:"my-editor",
    templateUrl:"app/editor.html",
    directives:[EditorComponent]
})
class MainComponent implements AfterViewInit{    
    doEditor = "do-editor";
    doTop = "do-top";
    doMiddle = "do-middle";
    doBottom = "do-bottom";
    doTopLeft = "do-topleft";
    doTopCenter = "do-topcenter";
    doTopRight = "do-topright"; 
    doMiddleLeft: "do-middleleft";    
    doMiddleRight: "do-middleright";
    cid: string = "doodler";       
    cropDone = false;
    enableCropper = false;  
    grayScale: number = 0;
    brightness: number = 0;
    contrast: number = 1;
    invert: boolean = false;
    sepia: boolean = false;  
    imageSrc = "content/images/test.png";    
    constructor() {
    }
    invertIt(){
        this.invert = !this.invert;
    }
    sepiaIt(){
        this.sepia = !this.sepia;
    }
    
    ngAfterViewInit(){
        document.getElementById("do-fileinput").onchange = (e) => {
            var f = (<HTMLInputElement>e.target).files[0];
            var reader = new FileReader();
            reader.addEventListener("load", (e) => {
                this.imageSrc =  reader.result;
            }, false);
            reader.readAsDataURL(f);
    
            }         
        document.getElementById("do-fileselfie").onchange = (e) => {
            
        }
    }
}

bootstrap(MainComponent);