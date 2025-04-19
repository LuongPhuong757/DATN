import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ManageProductService} from "../manage-product.service";
import {ApiProcessService} from "../../../user/api-process/api-process.service";
import {ShareDataService} from "../../../share-data.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  idProduct: any;
  product: any = {};
  imageUrl: string | ArrayBuffer | null | undefined = null;

  editProductForm = new FormGroup({
    productName: new FormControl(null, [
      Validators.required,
    ]),
    productAmount: new FormControl(null, [
      Validators.required,
    ]),
    productCategory: new FormControl(null, [
      Validators.required,
    ]),
    productMaterial: new FormControl(null, [
      Validators.required,
    ]),
    productPrice: new FormControl(null, [
      Validators.required,
    ]),
    productDiscount: new FormControl(null, [
      Validators.required,
    ]),
    productImg: new FormControl(null, [
      Validators.required,
    ]),
    productDescription: new FormControl(null, [
      Validators.required,
    ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiProduct: ManageProductService,
    private apiProductDetail: ApiProcessService,
    private share: ShareDataService,
    public toasterService: ToastrService
    ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idProduct = params.get('id');
      this.apiProductDetail.getProductDetail(+this.idProduct).subscribe(res => {
        console.log(res);
        this.product = res;
        this.editProductForm.patchValue({
          productName: this.product?.name ,
          productAmount: this.product.amount,
          productCategory: this.product.category,
          productMaterial: this.product.material,
          productDiscount: this.product.discount,
          productPrice: this.product.price,
          productDescription: this.product.description,
        });
      })
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onUpdateProduct(): void {
    const imageUrl: any = typeof this.imageUrl === "string" ? this.imageUrl.split(',') : this.imageUrl;
    const arrayImage = [];
    arrayImage.push(imageUrl[1]);
    const req = {
      name: this.editProductForm.get('productName')?.value,
      amount: this.editProductForm.get('productAmount')?.value,
      category: this.editProductForm.get('productCategory')?.value,
      material: this.editProductForm.get('productMaterial')?.value,
      price: this.editProductForm.get('productPrice')?.value,
      discount: this.editProductForm.get('productDiscount')?.value,
      images: arrayImage,
      description: this.editProductForm.get('productDescription')?.value,
    }
    this.apiProduct.updateProduct(this.idProduct, req).subscribe(res => {
      if (res) {
        console.log(res);
        this.router.navigate(['/admin/manage-product']);
        this.toasterService.success('Cập nhật sản phẩm thành công!');
      }
    })
  }
}
