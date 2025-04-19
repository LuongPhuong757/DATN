import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ManageUserService} from "../manage-user/manage-user.service";
import {ManageProductService} from "../manage-product/manage-product.service";
import {ManageOrderService} from "../manage-order/manage-order.service";

@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.scss']
})
export class PopupDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiUser: ManageUserService,
    private apiProduct: ManageProductService,
    private apiOrder: ManageOrderService,
  ) {}

  onConfirmClick(): void {
    console.log(this.data)
    if(window.location.href.includes('manage-user')) {
      this.apiUser.deleteUser(this.data).subscribe(res => {
        if(res) {
          this.dialogRef.close(true);
        }
      })
    } else if (window.location.href.includes('manage-product')) {
      this.apiProduct.deleteProduct(this.data).subscribe(res => {
        if(res) {
          this.dialogRef.close(true);
        }
      })
    }  else if (window.location.href.includes('manage-order')) {
      this.apiOrder.deleteOrder(this.data).subscribe(res => {
        if (res) {
          this.dialogRef.close(true);
        }
      })
    }

  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
