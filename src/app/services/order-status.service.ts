import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PizzaModel } from '../models/pizza-model';
import { PizzaStatusModel } from '../models/pizza-status';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private http: HttpClient) {
  }
  //get all pizzas returns an observeble
  public getPizzas(): Observable<PizzaModel[]> {    
    let url: string = environment.apiEndpoint + '/pizzaOrders';
    return this.http.get<PizzaModel[]>(url)
  }
//get all status returns an observeble
  public getAllStatus(): Observable<PizzaStatusModel[]> {    
    let url: string = environment.apiEndpoint + '/status';
    return this.http.get<PizzaStatusModel[]>(url)
  }
}
