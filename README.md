# Angular Token Based Security

Development Tools: Web API + Token Based Security + Angular 5 + Angular Material 2

Key: Angular, C#, Http Intercepter, Token Based Security, Customer Validator, Form Validator

Register:

Since we use token based security, we need an valid account to get the token. Username must be a valid email address and password is at least 8 characters with at least 1 uppercase, 1 lowercase, 1 digit and 1 symbol.

My custom password validator:

    import { AbstractControl } from '@angular/forms';

    export function ValidatePassword(control: AbstractControl) {
        let reg=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).(?=.*[!@#$%^&*.]).{7,}$");
        let res=reg.test(control.value);
        if(!res){
            return{invalidPassword:true};
        }    
    }



![image](https://github.com/xky0007/Angular-Token-Based-Security/blob/master/Screenshots/Register.jpg)

After we create an account, it will redirct to login page (if you registered before, login directly).


![image](https://github.com/xky0007/Angular-Token-Based-Security/blob/master/Screenshots/RegisterSuccessful.jpg)

With Fiddler, we can see we get the token from the web api server. Double check in the browser, they have the same value with the key 'myToken'. We can define the key as we wish.

![image](https://github.com/xky0007/Angular-Token-Based-Security/blob/master/Screenshots/Token1.jpg)
![image](https://github.com/xky0007/Angular-Token-Based-Security/blob/master/Screenshots/Token2.jpg)

Here is the code for http interceptor. Unless we register or login, each http request will be modified by adding the authorization token to the header, otherwise the web api will reject the request because the HttpGet api has Authorize attribute.

    import { Injectable } from '@angular/core';
    import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
    import { Observable } from 'rxjs/Observable';

    @Injectable()
    export class MyInterceptor implements HttpInterceptor {
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            
            if (req.url == "http://localhost:11694/token" || req.url == "http://localhost:11694/api/Account/Register") {
                return next.handle(req);
            }
            else {            
                let newReq = req.clone({ headers: new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('myToken')) });
                return next.handle(newReq);
            }

        }
    }

Web API Controller:

        [Route("Student/GetAll")]
        [Authorize]
        public IEnumerable<Student> GetStudent()
        {
            using (StudentDBContext context = new StudentDBContext())
            {
                return context.Students.ToList();
            }
        }


Last, we can read data from the api as we already have the valid token. If the browser doesn't have the token, it will redirect to login page.

    import { Component, OnInit } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import {MatTableDataSource} from '@angular/material';

    import { Router } from '@angular/router';
    import { IStudent } from '../student-list/student'
    @Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']
    })
    export class StudentListComponent implements OnInit {

    data: MatTableDataSource<IStudent>;
    displayColumns:string[]=['studentId','firstName','lastName','street','state','city','email','telephone'];
    constructor(private http: HttpClient,private router:Router) { }

    ngOnInit() {
        if(sessionStorage.getItem('myToken')==null)
        {
        this.router.navigateByUrl('/Login');
        }
        else{
        this.http.get<IStudent[]>('http://localhost:11694/student/getall').subscribe(success => {
        this.data = new MatTableDataSource<IStudent>(success);
        },
        error => {
            console.log(error);
        });
        }
    }
    }


Diplay data in the angular material table.

    <mat-table #table [dataSource]="data">
    <ng-container matColumnDef="studentId">
        <mat-header-cell *matHeaderCellDef> Student ID </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.StudentId}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="firstName">
        <mat-header-cell *matHeaderCellDef> First Name </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.FirstName}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="lastName">
        <mat-header-cell *matHeaderCellDef> Last Name </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.LastName}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="street">
        <mat-header-cell *matHeaderCellDef> Street </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.Street}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="city">
        <mat-header-cell *matHeaderCellDef> City </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.City}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="state">
        <mat-header-cell *matHeaderCellDef> State </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.State}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="email">
        <mat-header-cell *matHeaderCellDef> Email </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.Email}} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="telephone">
        <mat-header-cell *matHeaderCellDef> Telephone </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.Telephone}} </mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayColumns"></mat-header-row>
    <mat-row *matRowDef="let myRowData; columns: displayColumns"></mat-row>
    </mat-table>


![image](https://github.com/xky0007/Angular-Token-Based-Security/blob/master/Screenshots/Data1.jpg)

![image](https://github.com/xky0007/Angular-Token-Based-Security/blob/master/Screenshots/Data.jpg)


Summary:

It's very convenient to use Angular with AJAX request to the server. In addition, since we use http interceptor, we don't need to manually add authorization header for each request. All the http request will pass the interceptor first, then send the modified http request if needed.
