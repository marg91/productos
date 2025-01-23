import { Component, inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../servicios/product.service';
import { Iproducto } from '../../interfaces/iproducto';
import { Ifiltro } from '../../interfaces/ifiltro';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements OnInit {

  @Output() productosFiltrados = new EventEmitter<Iproducto[]>();  
  productos: Iproducto[] = [];
  filtro: Ifiltro = { name: '', category: '', price: 0, active: false };  
  ProductService = inject(ProductService);

  ngOnInit(): void {
    this.loadProducts();  
  }

  async loadProducts(): Promise<void> {
    try {
      this.productos = await this.ProductService.getProducts();
     
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  getDataFilter(miForm: NgForm): void {
    const filtros = miForm.value;
    const productosFiltrados = this.productos.filter(producto => {
      const coincideNombre = filtros.name?.trim() 
      ? producto.name.toLowerCase().includes(filtros.name.toLowerCase()) 
      : true; 
    const coincideCategoria = filtros.category?.trim() 
      ? producto.category.toLowerCase().includes(filtros.category.toLowerCase()) 
      : true; 

    const coincidePrecio = filtros.price 
      ? producto.price <= filtros.price 
      : true; 

    const coincideActivo = filtros.active === true 
      ? producto.active === filtros.active 
      : true; 
    return coincideNombre && coincideCategoria && coincidePrecio && coincideActivo;
  });

  this.productosFiltrados.emit(productosFiltrados);
  }

  
}
