import {Component, OnInit} from '@angular/core';
import {AppService, Guide} from '../app.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {async} from 'rxjs/scheduler/async';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  categories: string[] = ['Grails Apprentice', 'GORM', 'Grails Testing', 'Advanced Grails', 'Grails + Google Cloud', 'Grails + Javascript', 'Grails + iOS', 'Grails + Android'];
  guides: Guide[] = [];
  filteredGuides: Guide[] = [];
  filter = '';
  filterControl: FormControl = new FormControl();

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getGuides().subscribe((guides: Guide[]) => {
      this.guides = guides;
      this.filteredGuides = guides;
      guides.forEach((guide: Guide) => {
        if (this.categories.indexOf(guide.category) === -1) {
          this.categories.push(guide.category);
        }
      });
    });

    this.filterControl.valueChanges
      .debounceTime(300, async)
      .subscribe((newValue: string) => {
        console.log(newValue);
        this.filter = newValue.toLowerCase();
        this.filterGuides();
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
      });
    } else {
      this.resetFilter();
    }
  }

  nonEmptyCategories(): string[] {
    return this.categories.filter((category: string) => {
      return this.guidesByCategory(category).length > 0;
    });
  }

  guidesByCategory(category: string): Guide[] {
    return this.filteredGuides.filter((guide: Guide) => {
      return guide.category === category;
    });
  }

  filterTag(tag: string): void {
    this.filter = tag;
    this.filteredGuides = this.guides.filter((guide: Guide) => {
      return guide.tags.indexOf(tag) > -1;
    });
  }

  resetFilter(): void {
    this.filter = '';
    this.filterControl.setValue('');
    this.filteredGuides = this.guides;
  }

  slugify(text: string): string {
    return text.toLowerCase()
      .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
      .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
      .replace(/^-+|-+$/g, ''); // remove leading, trailing -
  }

  private strMatch(str1: string): boolean {
    str1 = str1.toLowerCase();
    return str1.indexOf(this.filter) > -1 || this.filter.indexOf(str1) > -1;
  }

}
