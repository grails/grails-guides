import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {

  constructor(private http: Http) {
  }

  getGuides(): Observable<Guide[]> {
    return this.http.get('guides.json')
      .map((res: Response) => {
        const items: any[] = res.json();
        return items.map((i) => new Guide(i));
      });
  }
}

export class Guide {
  authors: string;
  githubSlug: string;
  name: string;
  subtitle: string;
  tags: string[];
  title: string;
  category: string;

  constructor(object: any) {

    for (const prop in object) {
      this[prop] = object[prop];
    }
  }

  isQuickcast(): boolean {
    return this.tags.indexOf('quickcast') !== -1;
  }

}
