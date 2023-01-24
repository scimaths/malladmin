import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Product, ProductCount } from './components/products/products.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get(`${environment.baseURL}/product/get_products`);
  }
  addProduct(payload: Product) {
    return this.http.post(`${environment.baseURL}/product/add_product`, payload);
  }
  getThisProduct(payload: Product) {
    return this.http.post(`${environment.baseURL}/get_this_product/`, payload);
  }
  adjustStock(payload: ProductCount) {
    return this.http.post(`${environment.baseURL}/increase_stock`, payload);
  }
  nextID() {
    return this.http.get(`${environment.baseURL}/product/next_id`);
  }
}