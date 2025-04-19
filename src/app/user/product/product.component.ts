import {Component, OnDestroy, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ApiProcessService} from '../api-process/api-process.service';
import {Router} from '@angular/router';
import {Subject, Subscription, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  listProduct: any = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  };
  typeProduct = [1, 2, 3, 4, 5, 6, 7, 8];
  searchTerms = new Subject<string>();
  searchSubscription: Subscription = new Subscription();
  @ViewChild('myInput', {static: true}) myInput: ElementRef | undefined;

  constructor(private api: ApiProcessService,
              private router: Router,
              public toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getProduct();

    this.searchSubscription = this.searchTerms
      .pipe(
        debounceTime(1000), // Chờ 1 giây sau khi người dùng ngừng nhập
        distinctUntilChanged(), // Chỉ gửi yêu cầu mới nếu giá trị thay đổi
        switchMap((key: string) => this.getProduct( key))
      )
      .subscribe((results) => {
        this.listProduct = results;

      });
  }

  getProduct(key?: string) {
    this.listProduct = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
    };
    this.typeProduct.map((type) => {
      this.api.getProduct({type: type, key: key}).subscribe((res) => {
        this.listProduct[type].push(...res.body.listProduct);
      });
    });
    return of(this.listProduct);
  }

  onSearchProduct(inputValue: any): void {
    this.searchTerms.next(inputValue?.target.value || null);
    !inputValue?.target.value && this.getProduct();
  }

  clearValue(): void {
    if (this.myInput) {
      this.myInput.nativeElement.value = '';
      this.getProduct();
    }
  }

  realMoneyPrice(price: number, discount?: number): number {
    const value = discount ? price - (price * (discount / 100)) : price;
    return value;
  }

  getProductDetail(id: string): void {

    this.router.navigate(['/product/product-detail', id]);
  }

  addProductToCart(id: any): void {
    if (sessionStorage.getItem('role') === 'USER') {
      this.api.addProductToCart({productId: id}).subscribe(res => {
        if (res) {
          this.toasterService.success('Thêm sản phẩm thành công!');

        }
      }, error => {
        console.log(error);
        if(error.error.message === "product_is_empty") {
          this.toasterService.error('Số lượng sản phẩm không đủ!');
        }
      })
    } else {
      this.router.navigate(['/user/login']);
    }
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
