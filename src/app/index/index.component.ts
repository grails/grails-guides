import {Component, OnInit} from '@angular/core';
import {AppService, Guide} from "../app.service";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import {async} from "rxjs/scheduler/async";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  categories: string[] = ["Grails Apprentice", "Advanced Grails", "Grails + Javascript", "Grails + iOS", "Grails + Android"];
  guides: Guide[] = [];
  filteredGuides: Guide[] = [];
  filter: string = "";
  filterControl: FormControl = new FormControl();

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getGuides().subscribe((res: Guide[]) => {
      this.guides = res;
      this.filteredGuides = res;
    });

    this.filterControl.valueChanges
        .debounceTime(300, async)
        .subscribe((newValue: string) => {
          console.log(newValue);
          this.filter = newValue.toLowerCase();
          this.filterGuides()
        });
  }

  filterGuides(): void {
    if (this.filter) {
      this.filteredGuides = this.guides.filter((guide: Guide) => {
        return guide.tags.filter((tag: string) => {
              return this.strMatch(tag);
            }).length > 0 ||
            this.strMatch(guide.authors) ||
            this.strMatch(guide.title) ||
            this.strMatch(guide.subtitle);
      })
    } else {
      this.resetFilter();
    }
  }

  nonEmptyCategories(): string[] {
    var nonEmptyCategories: string[] = [];
    for ( var category of this.categories ) {
      if ( this.guidesByCategory(category).length > 0 ) {
         nonEmptyCategories.push(category)
      }
    }
    return nonEmptyCategories;
  }

  guidesByCategory(category: string): Guide[] {
      return this.filteredGuides.filter((guide: Guide) => {
        return guide.category == category
      })
  }

  filterTag(tag: string): void {
    this.filter = tag;
    this.filteredGuides = this.guides.filter((guide: Guide) => {
      return guide.tags.indexOf(tag) > -1;
    })
  }

  resetFilter(): void {
    this.filter = "";
    this.filteredGuides = this.guides;
  }

  private strMatch(str1: string): boolean {
    str1 = str1.toLowerCase();
    return str1.indexOf(this.filter) > -1 || this.filter.indexOf(str1) > -1;
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
