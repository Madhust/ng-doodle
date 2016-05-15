export class Effects{
    
    pixels: ImageData;    
    constructor(){
        //this.pixels = pixels;
    }
    private clampValue (value: number){
        return Math.max(0, Math.min(value, 255));
    }
    
    grayScale(data: ImageData, percent: number): ImageData{
         var d = data.data;  
             var gamma = (percent / 100);
            for (var i = 0; i < d.length; i+=4) {
                var r = d[i];
                var g = d[i + 1];
                var b = d[i + 2];
                var v = 0.299 * r + 0.587 * g + 0.114 * b;                             
                d[i] = d[i + 1] = d[i + 2] =  this.clampValue(v + (v * gamma));
            }
            return data;
    }
    
    brighten(data: ImageData, amount: number /*amount - ranges from -1 to 1*/) :ImageData {
        var d = data.data; 
        for (var i = 0; i < d.length; i += 4) {
                d[i] = this.clampValue(d[i] * amount);
                d[i + 1] = this.clampValue(d[i + 1] * amount);
                d[i + 2] = this.clampValue(d[i + 2] * amount);
            }
        return data;
    }
    invert(data: ImageData): ImageData {
        var d = data.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] = 255 - d[i];
            d[i + 1] = 255 - d[i + 1];
            d[i + 2] = 255 - d[i + 2];                
        }
        return data;
    }
    sepia(data: ImageData, percent: number) :ImageData {
            var d = data.data, r, g, b, rp, gp, bp, 
            pt = function (p) { return p - (p * (percent | 0 / 100)); };
            
            for (var i = 0; i < d.length; i += 4) {
                r = d[i];
                g = d[i + 1];
                b = d[i + 2];
                rp = (r * .393) + (g * .769) + (b * .189);
                gp = (r * .349) + (g * .686) + (b * .168);
                bp = (r * .272) + (g * .534) + (b * .131);                
                d[i] = rp; d[i + 1] = gp; d[i + 2] = bp;
            }
            return data;
    }
    contrast(data: ImageData, contrast: number /* ranges from 0-255*/) :ImageData {
            var d = data.data; var f = (259 * (contrast + 255)) / (255 * (259 - contrast))
            for (var i = 0; i < d.length; i += 4) {
                d[i] = this.clampValue(f * (d[i] - 128) + 128);
                d[i + 1] = this.clampValue(f * (d[i + 1] - 128) + 128);
                d[i + 2] = this.clampValue(f * (d[i + 2] - 128) + 128);
            }
            return data;
        }
    hexColor(data: ImageData, hex:string) : ImageData {
            var d = data.data, rgb;
            rgb = this.hextorgb(hex); 
            for (var i = 0; i < d.length; i += 4) {
                var r = Math.max(d[i],rgb.r);
                var g = Math.max(d[i + 1], rgb.g);
                var b = Math.max(d[i + 2], rgb.b);
                d[i] = r;
                d[i + 1] = g;
                d[i + 2] = b;
            }
            return data;
        }
          
    hextorgb(hex:string){
            var r,g,b,result;
            hex = hex.replace('#','');
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
            result = {'r':r,'g':g,'b':b};
            return result;
        }  
            
        
}