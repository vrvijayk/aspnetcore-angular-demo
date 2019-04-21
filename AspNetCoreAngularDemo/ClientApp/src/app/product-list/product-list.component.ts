import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { AuthService } from "./../auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  products = [];
  queryParams = { name: "", page: 1, pageSize: environment.pageSize, sortBy: "Name", sortAscending: true };
  totalItems = 0;
  dataLastLoaded;
  reloadPagination = false;
  
  

  constructor(
    private productService: ProductService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  onDelete(id) {
    if (window.confirm("Are you sure, you want to delete?")) {
      this.productService.delete(id).subscribe(data => {
        this.products = this.products.filter(p => p["id"] !== id);
      });
    }
  }

  onSearch() {
    this.queryParams.page = 1;
    this.reloadPagination = true;
    this.getProducts();
  }

  onPageChanged(page) {
    this.queryParams.page = page;
    this.getProducts();
  }

  getProducts() {
    this.productService.getByParams(this.queryParams).subscribe((data: any) => {
      this.totalItems = data.totalItems;
      this.products = data.items;
      if (this.reloadPagination) {
        this.dataLastLoaded = Date.now();
        this.reloadPagination = false;
      }
    });
  }

  onSort(sortBy) {
    this.queryParams.sortAscending = (this.queryParams.sortBy != sortBy) ? true : !this.queryParams.sortAscending;
    this.queryParams.sortBy = sortBy;
    this.queryParams.page = 1;
    this.reloadPagination = true;
    this.getProducts();
    
  }
}
