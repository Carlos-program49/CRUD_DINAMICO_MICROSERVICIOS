import { Routes } from '@angular/router';
import { CountriesComponent } from './components/countries/countries';
import { UserFormComponent } from './components/user-form/user-form';

export const routes: Routes = [


{
    path: 'countries',
    component: CountriesComponent
  },
   { path: 'user-form', component: UserFormComponent }
 

];
