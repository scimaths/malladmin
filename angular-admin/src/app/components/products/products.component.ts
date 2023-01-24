import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface MallAdmin {
  mallAdminID: number;
  name: string;
  mallID: number;
}

export interface ShopAdmin {
  shopAdminID: number;
  name: string;
  shopID: number;
}

export interface Mall {
  mallID: number;
  name: string;
  location: string;
}

export interface Shop {
  shopID: number;
  name: string;
  floor: number;
  mall: Mall;
}

export interface Product {
  productID: number;
  name?: string;
  aisle?: string;
  quantity?: number;
  description?: string;
  price?: number;
  image?: string;
  shopID?: number;
}

export interface ProductCount {
  productID: number;
  quantity: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  image_paths: Array<SafeResourceUrl> = [];
  this_product: Product = {
    productID: 3,
    name: 'Mug',
    aisle: '3A',
    quantity: 4,
    description: 'This product is not for sale',
    price: 400,
  };

  constructor(
    private http: HttpService,
    private router: Router,
    private _sanitizer: DomSanitizer
  ) {}

  _getProducts(): void {
    this.http.getAllProducts().subscribe((data: any) => {
      this.products = data.data;
      for (let product in this.products) {
        var img_src: string = (product as any).image;
        this.image_paths.push(this._sanitizer.bypassSecurityTrustResourceUrl(img_src))
      }
      console.log(this.products);
      console.log("Hello!");
    });
  }

  _adjustStock(id: number, qty: string): void {
    let qty_num = parseInt(qty);
    let payload: ProductCount = {
      productID: id,
      quantity: qty_num
    }
    console.log(payload);
    this.http.adjustStock(payload).subscribe(() => {
      alert(`Stock updated by ${qty} for Product ${id}`)
    })
  }

  _editProduct(id: number): void {
    this.router.navigate(['add_product'], {queryParams: { productID: id }})
  }

  ngOnInit(): void {
    this._getProducts();
  }
}
