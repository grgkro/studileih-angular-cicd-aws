import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../_models/product';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [  // ermöglicht das Erstellen von kleinen Animationen
    trigger('listStagger', [  // listStagger ist eine spezielle Animation, bei der die Liste nicht auf einmal dargestellt wird, sondern zeitlich verzögert auftaucht
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {
  products: Product[];
  imageToShow: any;
  photos: Array<Object> = [];
  map = new Map();


  constructor(private activatedRoute: ActivatedRoute, private _data: DataService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    // var map = ;
    this.products = this.activatedRoute.snapshot.data['products']
    //this.products = (this.activatedRoute.data.subscribe((data: { products }) => { console.log("hello"+data)
     // this.map = data;

     // this.products = data.products;
      
      // this.loadProducts();  //load all products from the database
      //  this.products.forEach(product => {
      //    this.loadMainProductPicture(product);
      //  })

     // }));
    
  }

  // //loads all products from Database - with the main photo (=the first photo = picPaths[0])
  // loadProducts() {
  //   this._data.getProducts().subscribe(
  //     products => {
  //       this.products = products; 
        

  //     });
  // }

  // //loads only the first picture of the pictures of a product (= the main picture)
  // loadMainProductPicture(product: Product) {
  //   if (product && product.picPaths && product.picPaths.length > 0) {      // https://stackoverflow.com/questions/62644464/angular-10-undefined-error-despite-if-null
  //     // after loading the product, load one product pic (the first photo from the product.picPaths arraylist)
  //     this._data.loadProductPicByFilename(product.picPaths[0], product.id).subscribe(
  //       image => {   // we only load the first poduct pic to display in the overview (the other pics can be viewed in the product details)
  //         this.createImageFromBlob(image, product.id);          // transorfms the blob into an image
  //       },
  //       (err: HttpErrorResponse) => this.processError(err)    // if the image could not be loaded, this part will be executed instead 
  //     );
  //   }
  // }

  // // This image upload code is basically taken from here: https://stackoverflow.com/questions/45530752/getting-image-from-api-in-angular-4-5  (first answer) or see the code directly: https://stackblitz.com/edit/angular-1yr75s
  // // But I had to add the sanitization part, otherwise Firefox and Chrome always blocked the image/blob. https://angular.io/guide/security#xss -> Potential security risk... 
  // createImageFromBlob(image: Blob, productId: number): any {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     // Somebody could create an image and hide javascript code inside of it (an image is just a very long text formatted in base64) 
  //     // -> this script would get executed, if the image get's transferred to our HTML page in the next line. Therefore it gets blocked by default, unless we bypass it.
  //     // the image is read by the FileReader and is returned as an "any". But this needs to be sanitized first, before it can be shown in the HTML. Therefore we pass it into the sanitzation, but there we need a String, therefore we use: reader.result + ""   
  //     // this.photos are the photos we want to display stored in an array 
  //     //this.photos.push(this.sanitizer.bypassSecurityTrustResourceUrl(reader.result + ""));  
  //      this.map.set(productId, this.sanitizer.bypassSecurityTrustResourceUrl(reader.result + ""));  
  //     console.log(this.sanitizer.bypassSecurityTrustResourceUrl(reader.result + ""))
  //     console.log(this.map.get(productId))
  //     console.log(this.map.size)
  //     for (let [key, value] of this.map.entries()) {
  //       console.log(key, value);
  //   }
  //   }, false);

  //   if (image) {
  //     reader.readAsDataURL(image); //this triggers the reader EventListener
  //   }
  // }

  
  // takes the error and then displays a response to the user or only logs the error on the console (depending on if the error is useful for the user)
  processError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('An client-side or network error occurred:', err.error);
    } else if (err.status == 404) {
      console.log("User or ProfilePic not found");
    } else {
      //Backend returns unsuccessful response codes such as 400, 500 etc.
      console.log('Backend returned status code: ', err.status);
      console.log('Response body:', err.error);
    }
  }
  
  deleteProduct(id:number) {
    this._data.deleteProduct(id)
      .subscribe(data => {
        this.products = this.products.filter(product => product.id !== id);
        console.log('Product deleted successfully!');
      })
  };

  editProduct(product: Product) {
    window.localStorage.removeItem("productId");
    window.localStorage.setItem("productId", product.id.toString());
    this.router.navigate(['edit-product/:' + product.id]);
  };

}