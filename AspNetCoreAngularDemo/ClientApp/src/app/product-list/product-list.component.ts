import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { AuthService } from "./../auth.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  products = [];

  constructor(
    private productService: ProductService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
    });
  }

  onDelete(id) {
    if (window.confirm("Are you sure, you want to delete?")) {
      this.productService.delete(id).subscribe(data => {
        this.products = this.products.filter(p => p["id"] !== id);
      });
    }
  }
}
