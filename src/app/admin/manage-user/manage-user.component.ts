import {Component, OnInit} from '@angular/core';
import { ManageUserService } from './manage-user.service';
import {PopupDeleteComponent} from "../popup-delete/popup-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  listUser: any[] = [];
  // totalUser = 0;
  constructor(private apiUser: ManageUserService, public dialog: MatDialog,
              public toasterService: ToastrService) {}

  ngOnInit(): void {
   this.getUser();
  }

  getUser(): void {
    this.apiUser.getUser({}).subscribe(res => {
      this.listUser = res.body.listUser.filter((i: any) => i.roles === 'USER');
      // this.totalUser = res.body.total;
    })
  }
  onDelete(user?: any): void {
    const dialogRef = this.dialog.open(PopupDeleteComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getUser();
        this.toasterService.success('Xóa khách hàng thành công!');
      }
    });
  }
  /*onEdit(user?: any): void {
    console.log(user)
  }*/
}
