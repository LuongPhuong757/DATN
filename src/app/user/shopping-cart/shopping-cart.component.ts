import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service';
import {ManageUserService} from "../../admin/manage-user/manage-user.service";
import {ShareDataService} from "../../share-data.service";
import {ToastrService} from "ngx-toastr";
import {ApiProcessService} from "../api-process/api-process.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {WebSocketService} from "../../services/websocket.service";

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
  orderForm: FormGroup;
  userId: string = '';
  userData: any = {};

  constructor(private apiShoppingCart: ShoppingCartService,
              private api: ApiProcessService,
              private apiUser: ManageUserService,
              private shareData: ShareDataService,
              public toasterService: ToastrService,
              private router: Router,
              private wsService: WebSocketService
  ) {
    this.userId = sessionStorage.getItem('userId') || '';
    this.orderForm = new FormGroup({
      userName: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl('')
    });
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
      this.totalMoney = res.totalMoney;
      this.apiUser.getUserId(this.productId).subscribe(res => {
        this.product = res;
        // Initialize userData with current user info
        this.userData = {
          id: this.productId,
          userName: res.userName,
          phoneNumber: res.phoneNumber,
          email: res.email,
          address: res.address
        };
      })
    })
  }

  updateUserData(field: string, event: any): void {
    this.userData[field] = event.target.value;
    console.log('Updated userData:', this.userData);
  }

  deleteInCart(id: number): void {
    this.apiShoppingCart.deleteProductInCart(id).subscribe(res => {
      this.getCart();
    })
  }

  changeAmount(increase: boolean,id: any, productId: any): void {
    if (increase) {
      this.api.updateProductInCart(id,{type: 0}).subscribe(res => {
        if (res) {
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
      this.api.updateProductInCart(id, {type: 1}).subscribe(res => {
        if (res) {
          this.getCart();
          this.toasterService.success('Giảm bớt sản phẩm thành công!');
          this.listProduct.result.forEach((i: any) => {
            if (i.product.id === productId) {
              i.amount--;
            }
          })
        }
      }, error => {
        console.log(error);
        if (error.error.message === "product_is_empty") {
          this.toasterService.error('Số lượng sản phẩm không đủ!');
        }
      })
    }
  }

  realMoneyPrice(price: number, discount?: number): number {
    const value = discount ? price - (price * (discount / 100)) : price;
    return value;
  }

  provisionalMoney(price: number, amount: number): number {
    this.totalProvisionalMoney = price * amount;
    return this.totalProvisionalMoney;
  }

  addOrder(): void {
    console.log('Updated userData:', this.userData);
    this.apiShoppingCart.addOrder({...this.userData}).subscribe(res => {
      if (res) {
        this.toasterService.success('Đặt hàng thành công!');
        // Send message to user's chat room
        const message = `Tôi đã đặt một đơn hàng mới với tổng giá trị ${this.totalMoney.toLocaleString('vi-VN')}đ`;
        this.wsService.sendMessage(this.userId, message, this.userId, false);
      }
    }, error => {
      console.log(error)
    })
  }

}
