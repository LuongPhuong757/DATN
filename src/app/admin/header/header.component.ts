import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() {
  }

  onLogout() : void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  }
}
