export class Effects{
    
    pixels: Int8Array;    
    constructor(pixels: Int8Array){
        this.pixels = pixels;
    }
    private clampValue (value: number){
        return value > 255 ? 255 : value;
    }
    
    grayScale(percent: number){
         var d = this.pixels,  rp = 0.2126, gp = 0.7152, bp = 0.0722;            
         for (var i = 0; i < d.length; i+=4) {
                var r = d[i];
                var g = d[i + 1];
                var b = d[i + 2];
                var v = rp * r + gp * g + bp * b;
                v = this.clampValue(v + (v * (percent/100)));
                d[i] = d[i + 1] = d[i + 2] = v;
         }
         return this.pixels;
    }
    
    brighten(percent: number) {
        var d = this.pixels; percent = 255 * (percent / 100);
        for (var i = 0; i < d.length; i += 4) {
            d[i] = this.clampValue(d[i] + percent);
            d[i + 1] = this.clampValue(d[i + 1] + percent);
            d[i + 2] = this.clampValue(d[i + 2] + percent);
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
    sepia(percent: number){                
        
        return this.pixels;
    }
}