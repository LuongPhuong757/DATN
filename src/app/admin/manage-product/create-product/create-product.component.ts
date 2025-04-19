import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ManageProductService} from "../manage-product.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  imageUrl: string | ArrayBuffer | null | undefined = null;

  createProductForm = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
    ]),
    productAmount: new FormControl(0, [
      Validators.required,
    ]),
    productCategory: new FormControl(0, [
      Validators.required,
    ]),
    productMaterial: new FormControl('', [
      Validators.required,
    ]),
    productPrice: new FormControl(0, [
      Validators.required,
    ]),
    productDiscount: new FormControl(0, [
      Validators.required,
    ]),
    productImg: new FormControl('', [
      Validators.required,
    ]),
    productDescription: new FormControl('', [
      Validators.required,
    ]),
  });


  constructor(
    // public dialogRef: MatDialogRef<CreateProductComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ManageProductService,
    private router: Router,
    public toasterService: ToastrService
  ) {
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

  onCreateProduct(): void {
    const imageUrl: any = typeof this.imageUrl === "string" ? this.imageUrl.split(',') : this.imageUrl;
    const arrayImage = [];
    arrayImage.push(imageUrl[1]);
    const req = {
      name: this.createProductForm.get('productName')?.value,
      amount: this.createProductForm.get('productAmount')?.value,
      category: this.createProductForm.get('productCategory')?.value,
      material: this.createProductForm.get('productMaterial')?.value,
      price: this.createProductForm.get('productPrice')?.value,
      discount: this.createProductForm.get('productDiscount')?.value,
      images: arrayImage,
      description: this.createProductForm.get('productDescription')?.value
    }
    this.api.addProduct(req).subscribe(res => {
      if (res) {
        console.log(res);
        this.router.navigate(['/admin/manage-product']);
        this.toasterService.success('Thêm sản phẩm thành công!');
      }
    })
  }
}
