import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iproducto } from '../../interfaces/iproducto';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Output() AddProduct: EventEmitter<Iproducto> = new EventEmitter<Iproducto>();
  products: Iproducto[]; 

  altaForm: FormGroup;

  constructor(){ 
    this.altaForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      image: new FormControl(null, [Validators.required, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      price: new FormControl(null, [Validators.required, Validators.min(1)]),
      category: new FormControl(null, [Validators.required]),
      active: new FormControl(null, [Validators.required]),
    }, [])

    this.products=[];

  }
  setDataForm(){
    let producto: Iproducto = this.altaForm.value as Iproducto;
 
  this.AddProduct.emit(producto);
    this.altaForm.reset();
    
  }

  camposRequeridos(formControlName: string, validators: string): boolean | undefined {
    return this.altaForm.get(formControlName)?.hasError(validators) 
    && this.altaForm.get(formControlName)?.touched
    }
  }

