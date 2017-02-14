/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('Component: Nav', () => {

  let component: NavComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot()
      ],
      declarations: [
        NavComponent
      ],
      providers: [

      ],
    });

    const fixture = TestBed.createComponent(NavComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

});
