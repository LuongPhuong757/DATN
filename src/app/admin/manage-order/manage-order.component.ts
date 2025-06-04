import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {ManageProductService} from "../manage-product/manage-product.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ManageOrderService} from "./manage-order.service";
import {PopupDeleteComponent} from "../popup-delete/popup-delete.component";
import {ToastrService} from "ngx-toastr";
import {WebSocketService} from "../../services/websocket.service";

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
              public toasterService: ToastrService,
              private wsService: WebSocketService
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

  getStatusBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-warning';
      case 'shipped':
        return 'bg-info';
      case 'delivered':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Chờ xử lý';
      case 'shipped':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  }

  markAsDelivered(order: any): void {
    const userId = sessionStorage.getItem('userId') || '';
    console.log(order,'============> order')
    
    // Send notification to user
    const message = `Đơn hàng #${order.id} của bạn đã được giao thành công!`;
    this.wsService.sendMessage(
      order.user.id.toString(),
      message,
      userId,
      true
    );

    // Update order shipping status
    this.api.updateOrderShippingStatus(order.id).subscribe(
      (response) => {
        if (response.status === 200) {
          this.toasterService.success('Đã cập nhật trạng thái giao hàng và thông báo cho khách hàng!');
          // Refresh order list
          this.getOrder();
        }
      },
      (error) => {
        console.error('Error updating order status:', error);
        this.toasterService.error('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng!');
      }
    );
  }
}
