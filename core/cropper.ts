export class Cropper{
  startX: number;
  startY: number;
  target: HTMLElement;
  centerX: boolean;
  centerY: boolean;
  cropDoneImg(e){
             var c = <HTMLCanvasElement>document.getElementById("mycanvas");
             var container = document.getElementById("canvasContainer");
              var ctx = c.getContext("2d");
              var img = <HTMLImageElement>document.getElementById("im");
              var cVisual= document.getElementById("cropVisual");
               ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight);
              ctx.drawImage(img, cVisual.offsetLeft, cVisual.offsetTop, cVisual.offsetWidth, cVisual.offsetHeight ,0,0, container.offsetWidth, container.offsetHeight);
              
          }
    loadImg(event) {
            
             var c= <HTMLCanvasElement>document.getElementById("mycanvas");
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
          var cVisual= document.getElementById("cropVisual");
          for(var idx in cSpan){
            var ele = <HTMLElement> cSpan[idx];
              ele.onmousedown = this.cropResizeDown;
          }
          cVisual.onmousedown = this.cropDown;
      cVisual.style.display = "block";
  }
  cropDown(e){
            if(e.target.id != "cropVisual")
             return true;
             this.startX= e.pageX; this.startY= e.pageY;
              document.onmousemove = this.cropMove;              
              document.onmouseup = this.cropUp;
              
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
             this.bindSpanEvent({move:this.cropResizeMove, up: this.cropResizeUp});
          }
          cropResizeMove(e) {

              var vsElement = <HTMLElement>document.getElementById("cropVisual");
              var cnvsElement = <HTMLElement>document.getElementById("mycanvas");
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
                      width = vsElement.offsetWidth - (x1 - x2 + 2);;
                      if (x2 < x1 || (cnvsElement.offsetLeft + cnvsElement.offsetWidth) > (vsElement.offsetLeft + width))
                          vsElement.style.width = width
                  }
                  else if (!crosPos.target.classList.contains("cropSpanRC")) {
                      var left = vsElement.offsetLeft + (x2 - x1);
                      width = vsElement.offsetWidth + (x1 - x2) - 2;
                      if (left >= -1 && left <= left + width ) {
                          vsElement.style.left = left.toString();
                          vsElement.style.width = width;
                      }
                  }
              }
              if (!crosPos.centerX) {
                  var height;
                  if (crosPos.target.classList.contains("cropSpanTC")) {
                      var top = vsElement.offsetTop + (y2 - y1);
                      height = vsElement.offsetHeight - (y2 - y1) - 2;
                      if (top >= -1 && top <= top + height) {
                          vsElement.style.top = top.toString();
                          vsElement.style.height = height
                      }
                  }
                  else if (!crosPos.target.classList.contains("cropSpanTC")) {
                      height = vsElement.offsetHeight - (y1 - y2 + 2)
                      if (y2 < y1 || (cnvsElement.offsetTop + cnvsElement.offsetHeight) > (vsElement.offsetTop + height))
                          vsElement.style.height = (vsElement.offsetHeight - (y1 - y2 + 2)).toString();
                  }
              }
          }
          cropResizeUp(){
              document.body.style.cursor = "";
              this.bindSpanEvent(null);
          }
           cropMove(e) {
              var cVisual = document.getElementById("cropVisual");
              var cnvs = document.getElementById("mycanvas");
              var orgPos = cnvs.getBoundingClientRect();
              var pageX = e.pageX; var pageY = e.pageY;
              if (e.pageX > cnvs.offsetWidth + cnvs.offsetLeft) {
                  cVisual.style.left = (cnvs.offsetLeft + cnvs.offsetWidth - cVisual.offsetWidth).toString();
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
              if (e.pageY > cnvs.offsetHeight + cnvs.offsetTop) {
                  cVisual.style.top = (cnvs.offsetTop + cnvs.offsetHeight - cVisual.offsetHeight).toString();
                  return true;
              }
              var xPos = this.startX > pageX ? cVisual.offsetLeft - (this.startX - pageX) : cVisual.offsetLeft - (this.startX - pageX);
              var yPos = this.startY > pageY ? cVisual.offsetTop - (this.startY - pageY) : cVisual.offsetTop - (this.startY - pageY);

              this.startX = pageX; this.startY = pageY;
              if (cnvs.offsetLeft <= xPos && cnvs.offsetLeft + cnvs.offsetWidth >= xPos + cVisual.offsetWidth)
                  cVisual.style.left = xPos.toString();
              if (cnvs.offsetTop <= yPos && cnvs.offsetTop + cnvs.offsetHeight >= yPos + cVisual.offsetHeight)
                  cVisual.style.top = yPos.toString();
          }
          cropUp(e){
               document.onmousemove = null;              
              document.onmouseup = null;
          }
          
}