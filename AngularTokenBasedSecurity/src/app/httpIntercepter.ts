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