import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUserComponent } from './manage-user/create-user/create-user.component';
import { CreateProductComponent } from './manage-product/create-product/create-product.component';
import { CreateProjectComponent } from './manage-project/create-project/create-project.component';
import {EditProductComponent} from "./manage-product/edit-product/edit-product.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'manage-user',
        component: ManageUserComponent,
        children: [
          {
            path: 'create-user',
            component: CreateUserComponent,
          },
        ],
      },
      {
        path: 'manage-product',
        children: [
          {
            path: '',
            component: ManageProductComponent
          },
          {
            path: 'create-product',
            component: CreateProductComponent
          },
          {
            path: 'edit-product/:id',
            component: EditProductComponent
          }
        ]
      },
      {
        path: 'manage-order',
        component: ManageOrderComponent,
      },
      {
        path: 'manage-project',
        component: ManageProjectComponent,
        children: [{
          path: 'create-project',
          component: CreateProjectComponent
        }]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
