import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore}  from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: AngularFireAuth, 
    private db: AngularFirestore
    ) {}

  /* A boolean variable that is used to show a loading spinner when the user clicks on the register
button. */
  inSubmission = false;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);

  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,
  });

  alertMsg = 'Please wait! Your account is being created!';
  alertColor = 'blue';
  showAlert = false;

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created!';
    this.alertColor = 'blue';
    this.inSubmission = true;
    let { email, password } = this.registerForm.value;
    if (!email || !password) {
      email = '';
      password = '';
    }
    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // console.log(userCred);
      await this.db.collection("users").add({
        name: this.name.value,
        email: this.email.value,
        age: this.age.value,
        phoneNumber: this.phoneNumber.value
      })
    } catch (e) {
      console.error(e);

      this.alertMsg = 'An Unexpected error occurred! Please try again later.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
  }
}
