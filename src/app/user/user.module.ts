import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProjectComponent } from './project/project.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PayComponent } from './shopping-cart/pay/pay.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import { BuySuccessComponent } from './shopping-cart/buy-success/buy-success.component';


@NgModule({
  declarations: [
    UserComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ProductComponent,
    ProductDetailComponent,
    ProjectComponent,
    NewsComponent,
    ContactComponent,
    ShoppingCartComponent,
    PayComponent,
    BuySuccessComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    // MatDialogModule,
    FormsModule,
    ToastrModule,
    ReactiveFormsModule
  ],
  // providers: [MatDialogRef],
})
export class UserModule {

}
