import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  isLoggedIn = false;

  constructor() {
    // Check if username exists in localStorage
    const username = sessionStorage.getItem('username');
    if (username) {
      this.isLoggedIn = true;
    }
  }
}
