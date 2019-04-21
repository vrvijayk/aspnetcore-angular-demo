import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: any = {id: 0};
  id = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id") || 0;
    if (this.id) {
      this.productService.get(this.id).subscribe(data => this.product = data);
    }
  }

  onSubmit(productForm) {
    if (this.id > 0) {
      this.productService.update(this.id, productForm.value).subscribe(data => {
        alert("Product updated successfully");
      }, error => {
        alert("error occured");
        console.log("error occured", error)
      });
    }
    else {
      this.productService.create(productForm.value).subscribe(data => {
        alert("Product created successfully");
        productForm.reset({ id: 0 });
      }, error => {
        alert("error occured");
        console.log("error occured", error)
      });
    }
  }

}
