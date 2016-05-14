export class Effects{
    
    pixels: Int8Array;    
    constructor(pixels: Int8Array){
        this.pixels = pixels;
    }
    private clampValue (value: number){
        return value > 255 ? 255 : value;
    }
    
    grayScale(percent: number){
         var d = this.pixels;  
             var gamma = (percent / 100);
            for (var i = 0; i < d.length; i+=4) {
                var r = d[i];
                var g = d[i + 1];
                var b = d[i + 2];
                var v = 0.299 * r + 0.587 * g + 0.114 * b;                             
                d[i] = d[i + 1] = d[i + 2] =  this.clampValue(v + (v * gamma));
            }
            return this.pixels;
    }
    
    brighten(amount: number /*amount - ranges from -1 to 1*/) {
        var d = this.pixels; 
        for (var i = 0; i < d.length; i += 4) {
                d[i] = this.clampValue(d[i] * amount);
                d[i + 1] = this.clampValue(d[i + 1] * amount);
                d[i + 2] = this.clampValue(d[i + 2] * amount);
            }
        return this.pixels;
    }
    invert() {
        var d = this.pixels;
        for (var i = 0; i < d.length; i += 4) {
            d[i] = 255 - d[i];
            d[i + 1] = 255 - d[i + 1];
            d[i + 2] = 255 - d[i + 2];                
        }
        return this.pixels;
    }
    sepia(percent: number) {
            var d = this.pixels, r, g, b, rp, gp, bp, 
            pt = function (p) { return p - (p * (percent | 0 / 100)); };
            
            for (var i = 0; i < d.length; i += 4) {
                r = d[i];
                g = d[i + 1];
                b = d[i + 2];
                rp = (r * .393) + (g * .769) + (b * .189);
                gp = (r * .349) + (g * .686) + (b * .168);
                bp = (r * .272) + (g * .534) + (b * .131);                
                d[i] = pt(rp); d[i + 1] = pt(gp); d[i + 2] = pt(bp);
            }
            return this.pixels;
    }
    contrast(contrast: number /* ranges from 0-255*/) {
            var d = this.pixels; var f = (259 * (contrast + 255)) / (255 * (259 - contrast))
            for (var i = 0; i < d.length; i += 4) {
                d[i] = this.clampValue(f * (d[i] - 128) + 128);
                d[i + 1] = this.clampValue(f * (d[i + 1] - 128) + 128);
                d[i + 2] = this.clampValue(f * (d[i + 2] - 128) + 128);
            }
            return this.pixels;
        }
    hexColor(hex:string)
        {
            var d = this.pixels,rgb;
            rgb = this.hextorgb(hex); 
            for (var i = 0; i < d.length; i += 4) {
                var r = Math.max(d[i],rgb.r);
                var g = Math.max(d[i + 1], rgb.g);
                var b = Math.max(d[i + 2], rgb.b);
                d[i] = r;
                d[i + 1] = g;
                d[i + 2] = b;
            }
            return this.pixels;
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