import {Component, Input} from '@angular/core';
import {Guide} from "../app.service";

@Component({
    selector: 'app-guide',
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.css']
})
export class GuideComponent {

    @Input() guide: Guide;

    constructor() { }

}
