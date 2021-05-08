import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Food } from './food.module';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss'],
})
export class ModelPageComponent implements OnInit {

  constructor(public modalController: ModalController, private http: HttpClient) { }

  foodItem = {} as Food;
  isLoaded = false;

  ngOnInit() {
   
  }

  add(){
    //localStorage.setItem("food",JSON.stringify(this.foodItem))
    this.modalController.dismiss(JSON.stringify(this.foodItem));
  }

  async addModal() {
    const modal = await this.modalController.create({
      component: ModelPageComponent,
      swipeToClose: true,
      presentingElement: await this.modalController.getTop() 
    });
    return await modal.present();
  }


  getFood(event){
    const requestOptions: Object = {
      responseType: 'text'
    }
    this.http.get<Food>('https://api.edamam.com/api/nutrition-data?app_id=ed00fad4&app_key=988a7a1f10a4bdd55cf3f812b5d3c359&ingr=1'+event["detail"]["value"],requestOptions).subscribe((data: any) => {
    if(JSON.parse(data)["calories"] > 0){
        data = JSON.parse(data)
        this.foodItem.name = event["detail"]["value"];
        this.foodItem.calories = data["calories"];
        this.foodItem.carbs = data["totalNutrients"]["CHOCDF"]["quantity"];
        this.foodItem.weight = data["totalWeight"];
        this.foodItem.fat = data["totalNutrients"]["FAT"]["quantity"];
        this.foodItem.protien = data["totalNutrients"]["PROCNT"]["quantity"];
        this.isLoaded = true;
      }
    });
  }
}
