import {Component, OnInit} from '@angular/core';
import {ApiProcessService} from "../../api-process/api-process.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  productId: any;
  productDetail: any = {
  };
  type = {
    1: 'Combo',
    2: 'Phòng khách',
    3: 'Phòng ngủ',
    4: 'Tủ bếp',
    5: 'Văn phòng',
    6: 'Đồ trang trí',
    7: 'Bàn',
    8: 'Ghế'
  }
    constructor(private api: ApiProcessService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                public toasterService: ToastrService) {
    }
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(params => {
        this.productId = params.get('id');
      });
      this.api.getProductDetail(+this.productId).subscribe(res => {
        console.log(res);
        this.productDetail = res;
      })
    }

  realMoneyPrice(price: number, discount?: number): number {
    const value = discount ? price - (price * (discount / 100)) : price;
    return value;
  }

  addProductToCart(id: any): void {
    this.api.addProductToCart({productId: id}).subscribe(res => {
      this.toasterService.success('Thêm sản phẩm thành công!');
    }, error => {
      console.log(error);
      if(error.error.message === "product_is_empty") {
        this.toasterService.error('Số lượng sản phẩm không đủ!');
      }
    })
  }
}
