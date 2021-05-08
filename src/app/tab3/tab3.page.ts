import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  @Output() isLogout = new EventEmitter<void>()

  title = 'firebase-angular-auth'
  isSignedIn = false;
  currentUser;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit(){
    if(localStorage.getItem('user') != null) {
      this.isSignedIn = true;
      var currentUserData = JSON.parse(localStorage.getItem("user"));
      this.currentUser = currentUserData['email']
    }
    else this.isSignedIn = false;
  }

  async onSignup(email:string, password:string){
    console.log("email: "+email)
    await this.firebaseService.signup(email,password);
    if(this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      var currentUserData = JSON.parse(localStorage.getItem("user"));
      this.currentUser = currentUserData['email']
    }
  }

  async onSignIn(email:string, password:string){
    await this.firebaseService.signin(email,password);
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn = true;
      var currentUserData = JSON.parse(localStorage.getItem("user"));
      this.currentUser = currentUserData['email']
    }
  }

  handleLogout(){
    this.isSignedIn = false;
  }

  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
    this.isSignedIn = false;
  }

}
