import {Component, OnInit} from '@angular/core';
import {AppService, Guide} from "../app.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  guides: Guide[];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getGuides().subscribe((res: Guide[]) => {
      this.guides = res;
    });
  }

}
