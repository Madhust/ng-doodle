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
    verticalFlip: boolean;
    horizontalFlip: boolean;
    constructor() {
    }
    invertIt(){
        this.invert = !this.invert;
    }
    sepiaIt(){
        this.sepia = !this.sepia;
    }
    
    vIt(){
        this.verticalFlip = !this.verticalFlip;
    }
     hIt(){
        this.horizontalFlip = !this.horizontalFlip;
    }
    saveAsJPG(){
        let editedImg = <HTMLCanvasElement>document.getElementById("doodler_host"),
            a = document.getElementById("do-fileasjpg");
        a.setAttribute("href", editedImg.toDataURL());
        a.click();
    }
    saveAsPNG(){
        let editedImg = <HTMLCanvasElement>document.getElementById("doodler_host"),
            a = document.getElementById("do-fileaspng");
        a.setAttribute("href", editedImg.toDataURL());
        a.click();
    }
    print(){        
       let editedImg = document.getElementById("doodler_host"),
           canvas = document.createElement("canvas"),
           context = canvas.getContext("2d"),
           win = window.open('','','width=1000,height=600');
       context.drawImage(<HTMLCanvasElement>editedImg, 0, 0);                     
       win.document.body.appendChild(canvas);
       win.print();
       win.close();       
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
            window["stream"]["getTracks"]()[0]["stop"]();
            document.getElementById("videocontainer").style.display = "none";
        };
         document.getElementById("cancel").onclick = () => {
             window["stream"]["getTracks"]()[0]["stop"]();
            document.getElementById("videocontainer").style.display = "none";  
         };         
        let firstOpt = <HTMLAnchorElement>document.querySelector("#open a");
        firstOpt.click();
                
         document.getElementById("do-topright").onclick = () => {
              document.getElementById("git_link").click();
         }
        
    }
}

bootstrap(MainComponent);