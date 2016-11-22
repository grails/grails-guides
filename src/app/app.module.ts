import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { rootRouterConfig } from './app.routes';
import { NavComponent } from './nav/nav.component';
import { GuideComponent } from "./guide/guide.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    GuideComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig),
    NgbModule.forRoot(),
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
