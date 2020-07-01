import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './_components/details/details.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { GoogleMapsComponent } from './_components/google-maps/google-maps.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ProductDetailsComponent } from './_components/product-details/product-details.component';
import { UploadFileComponent } from './_components/upload-file/upload-file.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';

import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'user-login',
    component: UserLoginComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  
  {
    path: 'upload-userPic',
    component: UploadFileComponent
  },
  {
    path: 'google-maps',
    component: GoogleMapsComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
