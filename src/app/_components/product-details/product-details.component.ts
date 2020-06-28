import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/_models/product';
import { UpdateService } from 'src/app/_services/update.service';
import { User } from 'src/app/_models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  imageToShow: any;
  user: User;   // In the beginning (before a user logged in) the user is undefined
  isCurrentUserOwner: boolean = false;
  showUploadComponent: boolean = false;
  errorMessage: string;
  imagesList = [];
 
  constructor(private route: ActivatedRoute, private data: DataService, private _update: UpdateService) {
    for (let i = 0; i < 50; i++) {
      const url = 'https://loremflickr.com/640/480?random=' + (i +1);
      this.imagesList[i] = {
        url: url,
        show: false
    };
  }
   }

  ngOnInit(): void {
     this._update.currentUser.subscribe(user => this.user = user)  // always get the latest logged in user -> if the user changes, this will get updated
     this._update.currentShowUploadComponent.subscribe(showUploadComponent => this.showUploadComponent = showUploadComponent)  // when the user uploaded a product photo, we want do not show the upload component anymore. But therefore we need the information, if a photo was uploaded from the upload component. -> If a user successfully uploads a product photo (status 200), the upload component will change showUploadComponent to false. The _update service then updates this value for all subscribes. Therefore we need to subscribe here, to get that change.
    // load the product:
    this.route.params.pipe(switchMap(params => this.data.getProduct(params['id'])))  // pipe & switchMap take care, that if the userId changes for some reason, the following process gets stopped: https://www.concretepage.com/angular/angular-switchmap-example (not necessary yet, because the user profile image loads pretty fast, but if that takes longer and the user switches to another site, it's better to stop the process)
      .subscribe(
        data => {
          this.product = data;
          this._update.changeProduct(this.product);    // we change the product in the data service so that if a picture for this product get's uploaded with the upload-file component, the image can be stored under the right productId.
          // is the user who looks at the details of this product also the owner of the product? if he is the owner -> show "delete", "update" and "Upload new Photo" button
          if (this.product.userId == this.user.id) {
            this.isCurrentUserOwner = true;
            this._update.changeImgType("productPic");   
          }  
        },
        (err: HttpErrorResponse) => {                 // if the product could not be loaded, this part will be executed instead 
          if (err.error instanceof Error) {
            console.log('An client-side or network error occurred:', err.error);
          } else if (err.status == 500 || err.status == 404) {
            this.errorMessage = "Produkt konnte nicht gefunden werden.";
          } else {
            //Backend returns unsuccessful response codes such as 400, 500 etc.
            console.log('Backend returned status code: ', err.status);
            console.log('Response body:', err.error);
            
          }
        }
        
        );
  }

  toggleUploadComponent() {
    this.showUploadComponent = !this.showUploadComponent;             // if showUploadComponent was false, it's now true.
  }
}