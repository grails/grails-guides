import {Component, OnInit} from '@angular/core';
import {AppService, Guide} from "../app.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  guides: Guide[];
  tags: string[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getGuides().subscribe((res: Guide[]) => {
      this.guides = res;
      this.guides.forEach((guide: Guide) => {
        guide.tags.forEach((tag: string) => {
          this.tags.push(tag);
        });
      });
      this.makeUnique(this.tags);
    });
  }

  private makeUnique(arr: string[]) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
      if(!u.hasOwnProperty(arr[i])) {
        a.push(arr[i]);
        u[arr[i]] = 1;
      }
    }
    return a;
  }

}
