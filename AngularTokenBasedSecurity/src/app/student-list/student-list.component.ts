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
