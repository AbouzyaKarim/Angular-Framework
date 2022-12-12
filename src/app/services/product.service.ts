import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>;

  constructor() {
    this.products = [
      {id:0,name:"Computer",price:6500,promotion:true},
      {id:1,name:"Printer",price:1500,promotion:false},
      {id:2,name:"Souris",price:650,promotion:true},
      {id:3,name:"Smart Phone",price:9050,promotion:false}
    ];
  }

  public getAllProducts() : Observable<Array<any>>{
    let rad=Math.random();
    if(rad<0.1) return throwError(() => new Error("Internet connexion error"));
    else return of(this.products);
  }

  public getProductById(p : any){
    return this.products.find(p);
  }

  public deleteProduct(id : number) : Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }

  public setPromotion(id : number) : Observable<boolean>{
    let product=this.products.find(p=>p.id==id);
    if(product != undefined){
      product.promotion = !product.promotion;
      return of(true);
    }else{
      return throwError(()=> new Error("Product not found"));
    }

  }
}
