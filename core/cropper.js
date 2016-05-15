                Cropper.prototype.bindSpanEvent = function (handler) {
                    document.onmousemove = handler ? handler.move : handler;
                    document.onmouseup = handler ? handler.up : handler;
                };
                Cropper.prototype.cropImg = function () {
                    var _this = this;
                    var cSpan = document.getElementsByClassName("cropSpan");
                    var cVisual = document.getElementById("cropVisual");
