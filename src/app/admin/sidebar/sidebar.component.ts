import {Component, OnInit} from '@angular/core';
import {ShareDataService} from "../../share-data.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userInfo: any = {};

  constructor(private shareData: ShareDataService) {
  }

  ngOnInit() {
    this.userInfo = this.shareData.getSharedData();
    this.userInfo.avatar = this.userInfo.avatar.slice(2, -2);
  }
}
