import { bootstrap }    from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { EditorComponent } from './editor.component';

/**
 * MainComponent
 */
@Component({
    selector:"m-app",
    template:'<my-app cid="{{i}}" gray={{gray}}></my-app>',
    directives:[EditorComponent]
})
class MainComponent {
    i: string = "doodler";
    gray: number = -1;    
    constructor() {
               
    }
}

bootstrap(MainComponent);