import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register-successfull-dialog',
  templateUrl: './register-successfull-dialog.component.html',
  styleUrls: ['./register-successfull-dialog.component.css']
})
export class RegisterSuccessfullDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<RegisterSuccessfullDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
