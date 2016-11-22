import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ValueProvider} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { rootRouterConfig } from './app.routes';
import { NavComponent } from './nav/nav.component';
import {GuideComponent} from "./guide/guide.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    GuideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig),
    NgbModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
