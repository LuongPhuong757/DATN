import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiProcessService} from "../../user/api-process/api-process.service";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  message = '';
  @ViewChild("myCheck", {read: ElementRef}) checkElm?: ElementRef; //checkElm? chỉ dùng được trong ngAfterViewInit và các hàm trong class (SignUp())

  contactForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]), //thuoc tinh firstname su dung form control
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])

  })

  get userName() {
    return this.contactForm.get('userName');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  get address() {
    return this.contactForm.get('address');
  }

  get password() {
    return this.contactForm.get('password');
  }

  get confirmPassword() {
    return this.contactForm.get('confirmPassword');
  }

  constructor(private api: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  public SignUp() {

    if (this.password?.value === this.confirmPassword?.value) {
      if (this.checkElm?.nativeElement.checked == true) {
        this.api.signUp({
          userName: this.userName?.value ?? undefined,
          email: this.email?.value ?? undefined,
          phoneNumber: this.phoneNumber?.value ?? undefined,
          address: this.address?.value ?? undefined,
          password: this.password?.value ?? undefined,
        }).subscribe((res) => {
          if (res) {
            this.message = 'Đăng ký thành công!';
            this.router.navigate(['login']);
          }
        },error => {
          if (error.error.message === 'email_already_exist') {
            this.message = 'Tài khoản đã tồn tại. Vui lòng đăng nhập!';
          } }
        )
      } else {
        this.message = 'Hãy đồng ý với các điều khoản!';
      }
    } else {
      this.message = 'Đăng ký không thành công. Kiểm tra confirm password!';
    }
  }
}
