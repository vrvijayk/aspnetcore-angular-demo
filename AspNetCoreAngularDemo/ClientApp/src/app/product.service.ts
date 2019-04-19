import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = environment.apiUrl + "/products";

  //constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  //  this.apiUrl = this.baseUrl + "api/products";
  //}
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.apiUrl);
  }

  get(id) {
    return this.http.get(this.apiUrl + "/" + id);
  }

  create(product) {
    return this.http.post(this.apiUrl, product);
  }

  update(id, product) {
    return this.http.put(this.apiUrl + "/" + id, product);
  }

  delete(id) {
    return this.http.delete(this.apiUrl + "/" + id);
  }
}
