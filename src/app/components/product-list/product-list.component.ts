import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../servicios/product.service';
import { Iproducto } from '../../interfaces/iproducto';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductFilterComponent } from "../product-filter/product-filter.component"; 
import { ProductFormComponent } from "../product-form/product-form.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent, ProductFormComponent], // Componente de tarjeta de producto
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'] // Corregido a styleUrls
})

export class ProductListComponent implements OnInit {
  products: Iproducto[] = []; // Lista de productos
  productosFiltrados: Iproducto[] = []
  constructor(private productService: ProductService) {}
  
  async ngOnInit(): Promise<void> {
    try {

      this.products = await this.productService.getProducts();
      this.productosFiltrados = [...this.products]; 
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  recibirProductosFiltrados(products: Iproducto[]): void {
    this.productosFiltrados = products;
  }

  eliminarProducto(producto: Iproducto): void {
    const index = this.productosFiltrados.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      this.productosFiltrados.splice(index, 1); // Eliminamos el producto de la lista filtrada
      console.log('Producto eliminado:', producto);
    }
  }
  onAddProduct(product: Iproducto): void {
    this.products.push(product);
    this.productosFiltrados.push(product);  // Asegúrate de agregarlo a la lista de productos filtrados también
  }
 }
