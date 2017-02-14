import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Guide} from '../app.service';

@Component({
    selector: 'app-guide',
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.css']
})
export class GuideComponent {

    @Input() guide: Guide;
    @Output() tagClicked: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

}
