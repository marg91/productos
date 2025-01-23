import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './servicios/product.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrección aquí: 'styleUrls' (plural)
})
export class AppComponent {
  title = 'ProductosTarea';


  constructor(private productService: ProductService) {
  }


}