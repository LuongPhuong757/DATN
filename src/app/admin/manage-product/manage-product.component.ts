import {Component, OnInit} from '@angular/core';
import {ManageProductService} from './manage-product.service';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {PopupDeleteComponent} from "../popup-delete/popup-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  listProduct: any[] = [];
  subscription = new Subscription
  activeCreate = false;

  constructor(private api: ManageProductService,
              private router: Router,
              private dialog: MatDialog,
              public toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.api
      .getProduct({})
      .subscribe((res) => {
        if (res.status === 200) {
          this.listProduct = res.body.listProduct;
        }
      });
  }

  onCreateProduct(): void {
    this.activeCreate = true;
  }

  onEdit(id: string): void {
    this.router.navigate(['/admin/manage-product/edit-product', id]);
  }

  onDelete(id?: string): void {
    const dialogRef = this.dialog.open(PopupDeleteComponent, {
      width: '500px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProduct();
        this.toasterService.success('Xóa sản phẩm thành công!');
      }
    });
  }
}
