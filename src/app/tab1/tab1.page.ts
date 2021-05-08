import { Component, OnInit} from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Food } from './food.module'
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import {ModelPageComponent} from 'src/app/model-page/model-page.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  totalCalories = 0;
  todayDate = new Date().toLocaleDateString();

  ngOnInit() {
      for(let i=0;i<=this.breakfastList.length-1;i++){
        this.totalCalories += Number(this.breakfastList[i]["calories"]);
      }
      for(let i=0;i<=this.lunchList.length-1;i++){
        this.totalCalories += Number(this.lunchList[i]["calories"]);
      }
      for(let i=0;i<=this.dinnerList.length-1;i++){
        this.totalCalories += Number(this.dinnerList[i]["calories"]);
      }
  }

  async presentModal(mealType:Food[]) {
    const modal = await this.modalController.create({
      component: ModelPageComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl, 
    });
    modal.onDidDismiss()
      .then((data) => {
        var foodItem = {} as Food;
        console.log(data["data"].split(',')[4].split(':')[1]);
        foodItem["name"] = data["data"].split(',')[0].split('"')[3];
        foodItem["calories"] = data["data"].split(',')[1].split(':')[1];
        foodItem["carbs"] = data["data"].split(',')[2].split(':')[1];
        foodItem["fat"] = data["data"].split(',')[4].split(':')[1];
        foodItem["protien"] = data["data"].split(',')[5].split(':')[1].slice(0, -1); 
        foodItem["weight"] = data["data"].split(',')[3].split(':')[1];
        this.breakfastList.push(foodItem);
        this.totalCalories += Number(foodItem["calories"]);
    });
    return await modal.present();
    
  }


  breakfastList: Food[] = [
    {
      name: "Eggs",
      calories:70,
      carbs: 0,
      protien:4,
      fat:12,
      weight:10
    }
  ];

  lunchList: Food[] = [
    {
      name: "Chicken and Rice",
      calories:210,
      carbs: 25,
      protien:20,
      fat:5,
      weight:10
    }
  ];

  dinnerList: Food[] = [
    {
      name: "Steak and Rice",
      calories:500,
      carbs: 25,
      protien:40,
      fat:20,
      weight:10
    }
  ];

  constructor(public firebaseService: FirebaseService, public modalController: ModalController, public routerOutlet: IonRouterOutlet) {}
}
