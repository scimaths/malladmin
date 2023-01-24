import { Component, OnInit } from '@angular/core';
import { Product } from '../products/products.component';
import { HttpService } from 'src/app/http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  this_product: Product = {
    productID: 3,
    name: 'INSERT NAME',
    aisle: 'INSERT AISLE',
    quantity: 0,
    description: 'INSERT DESCRIPTION',
    price: 0,
  };

  productForm = this.formBuilder.group({
    name: 'Pepsi',
    aisle: 'A2',
    quantity: 20,
    description: 'Soft drink',
    price: 20,
    image: ''
  });

  nextID = 3;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  _getThisProduct(id: number): void {
    let payload: Product = {
      productID: id,
    };
    this.http.getThisProduct(payload).subscribe((data: any) => {
      this.this_product = data.data;
      console.log(this.this_product);
    });
  }

  _getNumProducts(id: number): any {
    this.http.nextID().subscribe((data: any) => {
      this.nextID = data.next_id;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params['productID']) {
        console.log("XYZ");
        this._getThisProduct(params['productID']);
        this.nextID = params['productID'];
      }
      else {
        console.log("Here");
        this.http.nextID().subscribe((data: any) => {
          this.nextID = data.data;
          console.log(this.nextID);
        })
      }
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      let file_img = new ImageSnippet(event.target.result, file);
      this.productForm.value.image = file_img.src;
    });

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    this.this_product = {
      productID: this.nextID,
      name: this.productForm.value.name,
      aisle: this.productForm.value.aisle,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      description: this.productForm.value.description,
      image: this.productForm.value.image
    }
    console.log(this.this_product);
    this.http.addProduct(this.this_product).subscribe(() => {
      alert(`Product with ID ${this.nextID} added`);
    });
    this.productForm.reset();
  }
}
