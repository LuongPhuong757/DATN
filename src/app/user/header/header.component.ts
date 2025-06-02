import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subscription = new Subscription;
  activeShoppingCart = false;
  username: any = null
  constructor(
    //  private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
      this.activeShoppingCart =  sessionStorage.getItem('role') === 'USER';
      this.username = sessionStorage.getItem('username') || null
      // this.api.getCart({}).subscribe(res => {
      //   this.listProduct = res;
      //   res.forEach((i: any) => {
      //     this.totalProduct += i.amount;
      //   });
      // })
    }

  onLogout() : void {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('role', '');
    sessionStorage.setItem('username', '')
    this.activeShoppingCart = false;
this.username = null;
    //  this.cdr.detectChanges();
  }

}
