import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection}  from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import IUser from '../models/user.model'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>

  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore
) { 
  this.usersCollection =  db.collection('users');
  // auth.user.subscribe(console.log)
  this.isAuthenticated$ = auth.user.pipe(
    map( user=> !!user)
  )
}

  public async createUser(userData: IUser){

    if(!userData.password){
      throw new Error("Password not provided!");
    }

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
