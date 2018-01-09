import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ValidatePassword } from './validator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RegisterSuccessfullDialogComponent } from '../register-successfull-dialog/register-successfull-dialog.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  constructor(private router: Router, private http: HttpClient,private dialog: MatDialog) { }

  ngOnInit() {
    this.registerFormGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.min(8), Validators.required,ValidatePassword])
    });
  }
  btnTest():void{
    console.log(123);
  }

  btnExsitingUser(): void {
    this.router.navigateByUrl('/Login');
  }

  btnRegister(): void {
   if(this.registerFormGroup.valid){
    let body = {
      email: this.registerFormGroup.controls['email'].value,
      password: this.registerFormGroup.controls['password'].value,
      confirmPassword: this.registerFormGroup.controls['password'].value,
    };

    this.http.post('http://localhost:11694/api/Account/Register', body).subscribe(
      success => {
        console.log("Register successfully");
        let dialogRef = this.dialog.open(RegisterSuccessfullDialogComponent, {
          width: '250px',
          height:'150px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.router.navigateByUrl('/Login');
        });
        
      },
      error => {
        console.log(error);
      });
   }
  }
}

export function confirmPasswordValidator(password): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (password !== control.value) {
      return { 'Password must be same': { value: control.value } }
    }
  }
}
