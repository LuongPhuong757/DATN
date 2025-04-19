import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './project/project.component';
import { ProductComponent } from './product/product.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PayComponent } from './shopping-cart/pay/pay.component';
import {BuySuccessComponent} from "./shopping-cart/buy-success/buy-success.component";

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'shopping-cart',
        children: [
          {
            path: '',
            component: ShoppingCartComponent,
          },
          {
            path: 'pay',
            component: PayComponent,
          },
          {
            path: 'buy-success',
            component: BuySuccessComponent,
          }]
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            component: ProductComponent
          },
          {
            path: 'product-detail/:id',
            component: ProductDetailComponent
          }]
      },
      {
        path: 'project',
        component: ProjectComponent,
      },
      {
        path: 'news',
        component: NewsComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
 }
