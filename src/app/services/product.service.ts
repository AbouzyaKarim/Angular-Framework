import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
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

  public getPageProducts(page: number , size : number) : Observable<PageProduct>{
    let index = page*size;
    let totalPage = ~~(this.products.length/size);
    if(this.products.length % size !=0){
      totalPage++;
    }
    let pageProducts = this.products.slice(index, index+size);
    return of({page:page,size:size,totalPages:totalPage,products:pageProducts});
  }

  public getAllProducts() : Observable<Product[]>{
    this.products=this.products;
    return of(this.products);
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

  public SearchProducts(keyword:string, page:number,size:number) : Observable<PageProduct>{
    let products = this.products.filter(p=>p.name.includes(keyword));
    let index = page*size;
    let totalPage = ~~(products.length/size);
    if(this.products.length % size !=0){
      totalPage++;
    }
    let pageProducts = products.slice(index, index+size);

    return of({page:page,size:size,totalPages:totalPage,products:pageProducts});
  }
}
