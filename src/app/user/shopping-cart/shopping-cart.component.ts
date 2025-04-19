import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service';
import {ManageUserService} from "../../admin/manage-user/manage-user.service";
import {ShareDataService} from "../../share-data.service";
import {ToastrService} from "ngx-toastr";
import {ApiProcessService} from "../api-process/api-process.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  listProduct: any = [];
  totalProduct = 0;
  totalMoney = 0;
  totalProvisionalMoney = 0;
  product: any;
  productId = 0;
  orderForm = new FormGroup({});

  constructor(private apiShoppingCart: ShoppingCartService,
              private api: ApiProcessService,
              private apiUser: ManageUserService,
              private shareData: ShareDataService,
              public toasterService: ToastrService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCart();
    this.totalMoney = 0;
  }

  getCart(): void {
    this.apiShoppingCart.getCart({}).subscribe(res => {
      this.listProduct = res;
      this.totalProduct = res.totalProduct;
      this.productId = res.result[0].userId;
     /* res.result.forEach((i: any) => {
        this.totalProduct += i.amount;
      });*/
      this.totalMoney = res.totalMoney;
      this.apiUser.getUserId(this.productId).subscribe(res => {
        this.product = res;
        console.log(res)
      })
    })
  }

  deleteInCart(id: number): void {
    this.apiShoppingCart.deleteProductInCart(id).subscribe(res => {
      this.getCart();
    })

  }

  changeAmount(increase: boolean, productId: any): void {
    if (increase) {
      this.api.addProductToCart({productId: productId}).subscribe(res => {
        if (res) {
          // this.totalProduct++;
          this.getCart();
          this.toasterService.success('Thêm sản phẩm thành công!');
          this.listProduct.result.forEach((i: any) => {
            if (i.product.id === productId) {
              i.amount++;
            }
          })

        }
      }, error => {
        console.log(error);
        if (error.error.message === "product_is_empty") {
          this.toasterService.error('Số lượng sản phẩm không đủ!');
        }
      })
    } else {
      //update cart
    }
  }

  realMoneyPrice(price: number, discount?: number): number {
    const value = discount ? price - (price * (discount / 100)) : price;
    return value;
  }

  provisionalMoney(price: number, amount: number): number {
    console.log('a');
    this.totalProvisionalMoney = price * amount;
    return this.totalProvisionalMoney;
  }

  /*onTotalMoney(): number {
    this.totalMoney += this.totalProvisionalMoney;
    return this.totalMoney;
  }*/

  addOrder(): void {
    // this.router.navigate(['buy-success']);
    this.apiShoppingCart.addOrder({}).subscribe(res => {
      if (res) {
        this.toasterService.success('Đặt hàng thành công!');

      }
    }, error => {
      console.log(error)
    })
  }

}
