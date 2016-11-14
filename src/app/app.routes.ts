import {Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";

export const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
];

