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
        document.getElementById("do-fileselfie").onclick = (e) => {    
           var div = document.getElementById("videocontainer");
           div.style.display = "block"               
          var ele = <HTMLVideoElement >document.querySelector("#videoElement");
          var navigator = window.navigator;    
          navigator["getUserMedia"] = navigator["getUserMedia"] || navigator["webkitGetUserMedia"] || navigator["mozGetUserMedia"] || navigator["msGetUserMedia"] || navigator["oGetUserMedia"];
              if (navigator["getUserMedia"]) {
       navigator["getUserMedia"]({ video: true }, (stream) => {
                        window["stream"] = stream;
                        ele.src = window.URL.createObjectURL(stream);
                    }   , () => { alert("Something went wrong....")});
          }                        
        }
        
        document.getElementById("take").onclick = () => {
            var cv = <HTMLCanvasElement>document.getElementById("doodler_host");
            var ctx = <CanvasRenderingContext2D>cv.getContext("2d");
            ctx.drawImage(<HTMLVideoElement>document.getElementById("videoElement"),0,0, cv.width, cv.height);
            this.imageSrc = cv.toDataURL();
            window["stream"]["stop"]();
            document.getElementById("videocontainer").style.display = "none";
        };
    }
}

bootstrap(MainComponent);