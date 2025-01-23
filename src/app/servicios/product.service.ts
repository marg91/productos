import { Injectable } from '@angular/core';
import { Iproducto } from '../interfaces/iproducto';
import { Ifiltro } from '../interfaces/ifiltro';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://jsonblob.com/api/1328619160766439424'; 

  constructor() {} 
  getProducts(): Promise<Iproducto[]> {
    return fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return Array.isArray(data) ? data : data.products;
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
        throw error;
      });
    }
  }