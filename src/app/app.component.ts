import { Component } from '@angular/core';
import { OrderStatusService } from '../app/services/order-status.service';
import { PizzaModel } from '../app/models/pizza-model';
import { PizzaStatusModel } from '../app/models/pizza-status';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pizzaDetail: any = {}; //onclick pizza information get variable
  title = 'PizzaOrders'; //store title
  selectedStatus: string; //status change
  pizzasubscription: Subscription;
  statussubscription: Subscription;
  public pizzaData: PizzaModel[] = [];
  public pizzaStatus: PizzaStatusModel[] = [];
  indexExpanded: number = -1;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';//snack bar horizintal dimension
  verticalPosition: MatSnackBarVerticalPosition = 'top'; //snack bar vertical dimension

  constructor(private api: OrderStatusService, private _snackBar: MatSnackBar) {
    this.getAllPizzas(); //get all pizza orders
    this.getAllStatus(); //get all status
  }

  //get allpizzas
  public getAllPizzas() {
    this.pizzasubscription = this.api.getPizzas().subscribe((state) => {
      this.pizzaData = state;      
    },
      (err: any) => {
        console.log(err)
      },
      () => {
        this.pizzasubscription.unsubscribe();
      }
    );
  }
  //get all status
  public getAllStatus() {
    this.statussubscription = this.api.getAllStatus().subscribe((state) => {
      debugger
      this.pizzaStatus = state;
    },
      (err: any) => {
        console.log(err)
      },
      () => {
        this.statussubscription.unsubscribe();
      }
    );
  }

  //pizza onclick based event
  public pizzaDetails(item, index: number) {
    this.pizzaDetail = item;
    this.indexExpanded = index == this.indexExpanded ? -1 : index;
  }

  //status change/select
  public selectStatus(item, i) {
    debugger
    this.pizzaData[i].orderStatus = item.title;
    this.selectedStatus = item.title;
    this.openSnackBar();
  }

  //displaying status change event in notification mode @top right corner with 3000 ms
  public openSnackBar() {
    this._snackBar.open('Status Changes to ' + this.selectedStatus + ' !!! 🍕', 'End now', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
