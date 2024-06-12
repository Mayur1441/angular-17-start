import {Component} from '@angular/core';
import {LocalService} from '../../services/local.token';
import {Signup} from '../../models/signup.model';
import {LoginService} from '../../services/login.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  login: Signup = {
    username: '',
    password: '',
    repassword: '',
    roles: '',
    email: ''
  };
  submitted = false;
  responsemsg = false;
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
      this.router.navigate(['/rides']);
    }
  }

  doSignup(): void {
    if (this.login.username == '' || this.login.email == '' || this.login.password == '' || this.login.repassword == '') {
      alert('Fill required fields');
      return;
    }
    if (this.login.password !== this.login.repassword) {
      alert('Password not match');
      return;
    }
    const data = {
      username: this.login.username,
      firstname: this.login.firstname,
      lastname: this.login.lastname,
      mobile: this.login.mobile,
      password: this.login.password,
      email: this.login.email,
      roles: this.login.roles
    };

    this.LoginService.signup(data).subscribe({
      next: (res) => {
        console.log(res);
        // this.localStore.saveData('logindetails', JSON.stringify(res));
        this.submitted = true;
        this.responsemsg = res.message;
      },
      error: (e) => {
        console.error(e);
        alert(e.error.message)
      }
    });
  }
}
