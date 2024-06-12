import {Component} from '@angular/core';
import {Login} from '../../models/login.model';
import {LocalService} from '../../services/local.token';
import {LoginService} from '../../services/login.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  login: Login = {
    username: '',
    password: ''
  };
  submitted = false;
  loginDetails = null;

  constructor(
    private LoginService: LoginService,
    private localStore: LocalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    this.loginDetails = JSON.parse(this.localStore.getData('logindetails') + '');
    console.log('login compo', this.loginDetails);
    if (this.loginDetails != null) {
      this.router.navigate(['/dashboard']);
    }
  }

  doLogin(): void {
    if (this.login.username == '' || this.login.password == '') {
      alert('Fill required fields');
      return;
    }
    const data = {
      username: this.login.username,
      password: this.login.password
    };

    this.LoginService.login(data).subscribe({
      next: (res) => {
        console.log(res);
        this.localStore.saveData('logindetails', JSON.stringify(res));
        this.submitted = true;
        this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        console.error(e);
        alert(e.error.message)
      }
    });
  }
}
