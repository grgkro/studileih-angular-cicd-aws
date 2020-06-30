import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './_components/details/details.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { UploadFileComponent } from './_components/upload-file/upload-file.component';
import { GoogleMapsComponent } from './_components/google-maps/google-maps.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ProductDetailsComponent } from './_components/product-details/product-details.component';
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
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'user-login',
    component: UserLoginComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
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
    path: 'products',
    component: ProductsComponent
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
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'upload-userPic',
    component: UploadFileComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {
    path: 'google-maps',
    component: GoogleMapsComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
