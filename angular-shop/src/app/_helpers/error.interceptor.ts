import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';
import { MessageService } from '../messages/message.service';
import { HelperService } from '../shared/helper.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private messageService: MessageService, private helperService : HelperService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                if (err.error.message === "TokenExpiredError" && request.url !== this.helperService.getUrl("token")) {
                   this.authenticationService.getNewToken()
                   .pipe(first())
                   .subscribe();
                }
                else {
                  this.authenticationService.logout();
                  location.reload(true);
                }
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
