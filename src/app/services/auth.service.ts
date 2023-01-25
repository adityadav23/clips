import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore}  from '@angular/fire/compat/firestore';
import IUser from '../models/user.model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore
) { }

  public async createUser(userData: IUser){
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email!,
      userData.password!,
    );
    // console.log(userCred);
    if(!userCred.user){
      throw new Error("User cannot be null");
    }
    await this.db.collection("users").doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    })

    await userCred.user.updateProfile({
      displayName: userData.name
    })

  }
}

