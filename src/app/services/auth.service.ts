import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection}  from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import IUser from '../models/user.model'
import {delay, map, filter, switchMap} from 'rxjs/operators'
import {Router} from '@angular/router'
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>
  private redirect = false;
  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
) { 
  this.usersCollection =  db.collection('users');
  // auth.user.subscribe(console.log)
  this.isAuthenticated$ = auth.user.pipe(
    map( user=> !!user)
  )
  this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
    delay(1000)
  )
  this.router.events.pipe(
    filter( e => e instanceof NavigationEnd),
    map(e => this.route.firstChild),
    /* Using the switchMap operator to map the route to the data
    property of the route. */
    switchMap(route => route?.data ?? of({authOnly: false}))
  ).subscribe(data => {
    this.redirect = data['authOnly'] 
  })

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

  public async logout($event?: Event){
    if($event) $event.preventDefault();

    /* It's waiting for the signOut() function to finish before it moves on to the next line of code. */
    await this.auth.signOut();

   /* It's redirecting the user to the home page after they log out. */
    if(this.redirect)  await this.router.navigateByUrl('/')
 }
}

