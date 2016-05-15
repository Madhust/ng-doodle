import { bootstrap }    from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { EditorComponent } from './editor.component';

/**
 * MainComponent
 */
@Component({
    selector:"my-editor",
    templateUrl:"app/editor.html",
    directives:[EditorComponent]
})
class MainComponent {    
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
    imageSrc = "content/images/test.png";    
    constructor() {
    }
}

bootstrap(MainComponent);