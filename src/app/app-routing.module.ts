import {NgModule} from '@angular/core';
import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router';
import {TutorialsListComponent} from './components/tutorials-list/tutorials-list.component';
import {TutorialDetailsComponent} from './components/tutorial-details/tutorial-details.component';
import {AddTutorialComponent} from './components/add-tutorial/add-tutorial.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {LocalService} from "./services/local.token";

var routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'rides', component: TutorialsListComponent},
  {path: 'tutorials/:id', component: TutorialDetailsComponent},
  // { path: 'add', component: AddTutorialComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private localStore: LocalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  loginDetails = null;

  ngOnInit(): void {
    this.loginDetails = JSON.parse(this.localStore.getData('logindetails') + '');
    console.log('app compo', this.loginDetails);
    if (this.loginDetails == null) {
      // console.log('yes routes added');
      routes.push(
        {path: 'signup', component: SignupComponent},
        {path: 'login', component: LoginComponent}
      );
    }
  }

  doLogOut(): void {
    this.localStore.removeData('logindetails');
  }
}
