export class Cropper{
  startX: number;
  startY: number;
  target: HTMLElement;
  centerX: boolean;
  centerY: boolean;
  orgImg: HTMLImageElement;
  constructor(orginalImg: HTMLImageElement){
    this.orgImg = orginalImg;
  }
  cropDoneImg(){
             var c = <HTMLCanvasElement>document.getElementById("doodler_host");
             var container = document.getElementById("canvasContainer");
              var ctx = c.getContext("2d");
              var cVisual= <HTMLCanvasElement>document.getElementById("cropVisual");
               ctx.clearRect(0,0,c.width,c.height);
              ctx.drawImage(this.orgImg, cVisual.offsetLeft, cVisual["offsetTop"], cVisual.offsetWidth, cVisual.offsetHeight ,0,0, container.offsetWidth, container.offsetHeight);
              cVisual.style.display ="none"
              
          }
    loadImg(event) {
            
             var c= <HTMLCanvasElement>document.getElementById("doodler");
              var ctx = c.getContext("2d");
              var img = <HTMLImageElement>document.getElementById("im");
              ctx.drawImage(img, 0, 0 ,850, 700);
    }
    bindSpanEvent(handler){
              document.onmousemove = handler ? handler.move : handler;
              document.onmouseup = handler ? handler.up : handler;
          }
          
    cropImg(){
    var cSpan = document.getElementsByClassName("cropSpan");
                    var cVisual = document.getElementById("cropVisual");
                    var cnvs = <HTMLCanvasElement>cVisual.previousElementSibling;
                    var container = cVisual.parentElement;
                    var padLeft = cnvs.width * .1, padHeight =cnvs.height * .1;
                    container.style.width = cnvs.width.toString() + "px"; container.style.height = cnvs.height.toString() + "px";
                    container.style.top = padHeight.toString(); container.style.left = padLeft.toString()
                    
      cVisual.style.display = "block";
          for(var i= 0; i <  cSpan.length; i++){
            var ele = <HTMLElement>cSpan[i];
              ele.onmousedown = this.cropResizeDown;
          }
          cVisual.onmousedown = (e)=>{
            if((<HTMLElement>e.target).id != "cropVisual")
             return true;
             this.startX= e.pageX; this.startY= e.pageY;
              document.onmousemove = (e)=>{
              var cVisual = document.getElementById("cropVisual");
              var cnvs = <HTMLCanvasElement>document.getElementById("doodler");
              var orgPos = cnvs.getBoundingClientRect();
              var pageX = e.pageX; var pageY = e.pageY;
              if (e.pageX > cnvs.width + cnvs.offsetLeft) {
                  cVisual.style.left = (cnvs.offsetLeft + cnvs.width - cVisual.offsetWidth).toString();
                  return true;
              }
              if (e.pageX < orgPos.left - 1) {
                  cVisual.style.left = "0";
                  return true;
              }
              if (e.pageY < orgPos.top) {
                  cVisual.style.top = "0";
                  return true;
              }
              if (e.pageY > cnvs.height + cnvs["offsetTop"]) {
                  cVisual.style.top = (cnvs["offsetTop"] + cnvs.height - cVisual.offsetHeight).toString();
                  return true;
              }
              var xPos = this.startX > pageX ? cVisual.offsetLeft - (this.startX - pageX) : cVisual.offsetLeft - (this.startX - pageX);
              var yPos = this.startY > pageY ? cVisual["offsetTop"] - (this.startY - pageY) : cVisual["offsetTop"] - (this.startY - pageY);

              this.startX = pageX; this.startY = pageY;
              if (cnvs.offsetLeft <= xPos && cnvs.offsetLeft + cnvs.width >= xPos + cVisual.offsetWidth)
                  cVisual.style.left = xPos.toString()+"px";
              if (cnvs["offsetTop"] <= yPos && cnvs["offsetTop"] + cnvs.height >= yPos + cVisual.offsetHeight)
                  cVisual.style.top = yPos.toString()+"px";  
              };              
              document.onmouseup  = (e)=>{              
              document.onmouseup = null;
              document.onmousemove = null;
          }
              
          }
  }
  
          cropResizeDown(e: any){
              if(document.body.style.cursor == "not-allowed")
               return true;
              this.target= e.target; this.startX= e.pageX; this.startY= e.pageY;
              this.centerX= false; this.centerY= false;
              if(this.target.classList.contains("centerX")){                  
              this.centerX = true;
              document.body.style.cursor = e.target.classList.contains("cropSpanLC") ? "w-resize" : "e-resize"
              }
              else{
                  this.centerY = true;
              document.body.style.cursor = e.target.classList.contains("cropSpanTC") ? "n-resize" : "s-resize"
              }
               document.onmousemove = (e)=>{
              var vsElement = <HTMLElement>document.getElementById("cropVisual");
              var cnvsElement = <HTMLCanvasElement>document.getElementById("doodler");
              var crosPos = this;
              if (vsElement.offsetLeft + vsElement.offsetWidth == e.pageX)
                  return true;
              var x1 = crosPos.startX,
               y1 = crosPos.startY,
               x2 = e.pageX,
               y2 = e.pageY;

              crosPos.startX = e.pageX;
              crosPos.startY = e.pageY;
              if (!crosPos.centerY) {
                  var width;
                  if (crosPos.target.classList.contains("cropSpanRC")) {
                      width = vsElement.offsetWidth - (x1 - x2);;
                      if (x2 < x1 || (cnvsElement.offsetLeft + cnvsElement.width) > (vsElement.offsetLeft + width))
                          vsElement.style.width = width+"px";
                  }
                  else if (!crosPos.target.classList.contains("cropSpanRC")) {
                      var left = vsElement.offsetLeft + (x2 - x1);
                      width = vsElement.offsetWidth + (x1 - x2) ;
                      if (left >= -1 && left <= left + width ) {
                          vsElement.style.left = left.toString()+"px";
                          vsElement.style.width = width+"px";
                      }
                  }
              }
              if (!crosPos.centerX) {
                  var height;
                  if (crosPos.target.classList.contains("cropSpanTC")) {
                      var top = vsElement["offsetTop"] + (y2 - y1);
                      height = vsElement.offsetHeight - (y2 - y1) ;
                      if (top >= -1 && top <= top + height) {
                          vsElement.style.top = top.toString()+"px";
                          vsElement.style.height = height+"px";
                      }
                  }
                  else if (!crosPos.target.classList.contains("cropSpanTC")) {
                      height = vsElement.offsetHeight - (y1 - y2)
                      if (y2 < y1 || (cnvsElement["offsetTop"] + cnvsElement.height) > (vsElement["offsetTop"] + height))
                          vsElement.style.height = (vsElement.offsetHeight - (y1 - y2)).toString()+"px";
                  }
              }
          }
              document.onmouseup= (e)=>{
                document.body.style.cursor = "";
                document.onmousemove = null;
                document.onmouseup = null;
              }
          }
           
          
}