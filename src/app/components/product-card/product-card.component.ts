import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../servicios/product.service';
import { Iproducto } from '../../interfaces/iproducto';
import { Ifiltro } from '../../interfaces/ifiltro';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent   {
filtro: Ifiltro= { name: '', category: '', price: 0, active: false }; 
    @Input() product!: Iproducto; 
     ProductService = inject(ProductService);
    @Output() envioEliminar: EventEmitter<Iproducto> = new EventEmitter(); 

    
    eliminar(): void {
      this.envioEliminar.emit(this.product);
    }   
}


