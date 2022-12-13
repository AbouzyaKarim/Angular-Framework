import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../model/product.model";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>;

  constructor() {
    this.products = [
      {id:UUID.UUID(),name:"Computer",price:6500,promotion:true},
      {id:UUID.UUID(),name:"Printer",price:1500,promotion:false},
      {id:UUID.UUID(),name:"Souris",price:650,promotion:true},
      {id:UUID.UUID(),name:"Smart Phone",price:9050,promotion:false}
    ];

    for (let i = 0; i < 10; i++) {
      this.products.push({id:UUID.UUID(),name:"Computer",price:6500,promotion:true});
      this.products.push({id:UUID.UUID(),name:"Compu",price:6500,promotion:true});
      this.products.push({id:UUID.UUID(),name:"Computer",price:6500,promotion:true});
    }
  }

  public getAllProducts() : Observable<Array<any>>{
    let rad=Math.random();
    if(rad<0.1) return throwError(() => new Error("Internet connexion error"));
    else return of(this.products);
  }

  public getProductById(p : any){
    return this.products.find(p);
  }

  public deleteProduct(id : string) : Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }

  public setPromotion(id : string) : Observable<boolean>{
    let product=this.products.find(p=>p.id==id);
    if(product != undefined){
      product.promotion = !product.promotion;
      return of(true);
    }else{
      return throwError(()=> new Error("Product not found"));
    }
  }

  public SearchProducts(keyword:string) : Observable<Array<Product>>{
    let products = this.products.filter(p=>p.name.includes(keyword));

    return of(products);
  }
}
