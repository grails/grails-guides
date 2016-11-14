import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class AppService {

    constructor(private http: Http) { }

    getGuides(): Observable<Guide[]> {
        return this.http.get('guides.json')
            .map((res: Response) => res.json());
    }
}

export declare abstract class Guide {
    authors: string;
    githubSlug: string;
    name: string;
    subtitle: string;
    tags: string[];
    title: string;
}