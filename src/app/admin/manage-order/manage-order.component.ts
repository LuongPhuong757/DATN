import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {ManageProductService} from "../manage-product/manage-product.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ManageOrderService} from "./manage-order.service";
import {PopupDeleteComponent} from "../popup-delete/popup-delete.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent {
  listOrder: any[] = [];
  subscription = new Subscription
  activeCreate = false;

  constructor(private api: ManageOrderService,
              private router: Router,
              private dialog: MatDialog,
              public toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    this.api
      .getOrder({})
      .subscribe((res) => {
        if (res.status === 200) {
          this.listOrder = res.body;
        }
      });
  }

  countProduct(listProduct: any): number {
    let counter = 0;
    listProduct.reduce((i:any) => {counter +=i.amount
    })
    return counter;
  }

  onDelete(id?: string): void {
    const dialogRef = this.dialog.open(PopupDeleteComponent, {
      width: '500px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getOrder();
        this.toasterService.success('Xóa đơn hàng thành công!');
      }
    });
  }
}
