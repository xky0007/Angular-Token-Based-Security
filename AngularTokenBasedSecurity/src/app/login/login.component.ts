import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  myGroup: FormGroup;

  ngOnInit() {
    this.myGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8)])
    });
  }
  btnRegister(): void {
    this.router.navigateByUrl('/Register');
  }

  btnLogin(): void {
    if (this.myGroup.valid) {
      let body: string = "username=" + this.myGroup.controls['email'].value + "&password=" + this.myGroup.controls['password'].value + "&grant_type=password";
      this.http.post("http://localhost:11694/token", body, { observe: "response" }).subscribe(
        success => {
          sessionStorage.setItem("myToken", success.body['access_token']);
          this.router.navigateByUrl('/Data');
        },
        error => {
          console.log(error.body);
        });
    }

  }
}
