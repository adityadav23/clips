import { Component } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/compat/auth'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private auth:AngularFireAuth
  ){ }

  credentials = {
    email: "",
    password: ""
  }
  showAlert = false;
  alertMsg = "Please wait!. Weare logging you in."
  alertColor =  "blue";
  inSubmission = false;

  async login(){

    this.showAlert = true;
    this.alertMsg = "Please wait!. Weare logging you in."
    this.alertColor =  "blue";
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      )
    } catch (error) {
      
      console.error(error);
      
      this.alertMsg = 'An Unexpected error occurred! Please try again later.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }


    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
  }
}
