import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../login.service";
import {ShareDataService} from "../../share-data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message = '';

  contactForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  get email() {
    return this.contactForm.get('email');
  }

  get password() {
    return this.contactForm.get('password');
  }

  constructor(
    private router: Router,
    private api: LoginService,
    private shareData: ShareDataService,
  ) {
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.api.login({
      email: this.email?.value ?? undefined,
      password: this.password?.value ?? undefined,
    }).subscribe((res) => {
      if (res.user) {
        this.message = 'Đăng nhập thành công!';
        sessionStorage.setItem('token', res.accessToken);
        if (res.user.roles === 'USER') {
          this.router.navigate(['']);
          sessionStorage.setItem('role', 'USER');
        } else {
          this.router.navigate(['admin']);
        }
        this.shareData.setSharedData(res.user);
      }
    }, error => {
      if (error.error.message === 'email_does_not_exist') {
        this.message = 'Tài khoản chưa tồn tại. Vui lòng đăng ký!';
      } else {
        if (error.error.message === 'incorrect_email_password') {
          this.message = 'Vui lòng nhập đúng mật khẩu!';
        }
      }
    });
  }

}
