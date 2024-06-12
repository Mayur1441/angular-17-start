import {Component, OnInit} from '@angular/core';
import {LocalService} from './services/local.token';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(
    private localStore: LocalService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  title = 'Concart';
  loginDetails = {};
  userName = "";

  ngOnInit(): void {
    // this.loginDetails = JSON.parse(this.localStore.getData('logindetails') + '');
    // console.log('app-root loginDetails', this.loginDetails);
    // console.log(this.router)
  }
}
