/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavService } from './nav.service';
import { Observable, Observer } from 'rxjs';

describe('Component: Nav', () => {

  let component: NavComponent;

  const navService = {
    getNavData: () => {
      return Observable.create((observer: Observer<any>) => {
        observer.next({testValue: 3});
        observer.complete();
      });
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot()
      ],
      declarations: [
        NavComponent
      ],
      providers: [
        {provide: NavService, useValue: navService}
      ],
    });

    let fixture = TestBed.createComponent(NavComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it("should set applicationData on init", () => {
    component.ngOnInit();
    expect(component.applicationData.testValue).toBe(3);
  });

});
