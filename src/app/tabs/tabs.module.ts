import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire'
import { TabsPageRoutingModule } from './tabs-routing.module';
import { RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { FirebaseService } from '../services/firebase.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBTjPXCGPm14GUCQdbvTJcAXKVf95v2fk0",
      authDomain: "elegant-door-307323.firebaseapp.com",
      projectId: "elegant-door-307323",
      storageBucket: "elegant-door-307323.appspot.com",
      messagingSenderId: "550952185112",
      appId: "1:550952185112:web:5b0aee3bcc29a5bf07c26d",
      measurementId: "G-WN1HH3NZNT"
    }),
    RouterModule
  ],
  declarations: [TabsPage],
  providers:[FirebaseService]
})
export class TabsPageModule {}
