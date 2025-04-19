import { Component, OnInit } from '@angular/core';
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
  constructor(
    ) {}

    ngOnInit(): void {
      this.activeShoppingCart =  sessionStorage.getItem('role') === 'USER';
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
    this.activeShoppingCart = false;
  }

}
