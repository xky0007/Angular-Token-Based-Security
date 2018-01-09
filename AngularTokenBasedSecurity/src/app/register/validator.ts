import { AbstractControl } from '@angular/forms';

export function ValidatePassword(control: AbstractControl) {
    let reg=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).(?=.*[!@#$%^&*.]).{7,}$");
    let res=reg.test(control.value);
    if(!res){
        return{invalidPassword:true};
    }
 
}