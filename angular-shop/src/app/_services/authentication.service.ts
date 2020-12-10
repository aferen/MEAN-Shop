import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, Token } from '@app/models';
import { HelperService } from '../shared/helper.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private currentTokenSubject: BehaviorSubject<Token>;
    public currentToken: Observable<Token>;
    constructor(private http: HttpClient, private helperService : HelperService
      ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentToken')));
        this.currentToken = this.currentTokenSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentTokenValue(): Token {
      return this.currentTokenSubject.value;
  }

    login(email: string, password: string) {
        return this.http.post<any>(this.helperService.getUrl("login"), { email, password })
            .pipe(map(data => {
                // login successful if there's a jwt token in the response
                if (data.user && data.tokens) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    localStorage.setItem('currentToken', JSON.stringify(data.tokens));
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    this.currentUserSubject.next(data.user);
                    this.currentTokenSubject.next(data.tokens);
                }
                return data;
            }));
    }


    getNewToken() {
      return this.http.get<any>(this.helperService.getUrl("token"),{ headers : { "Authorization": "Bearer " +this.currentTokenValue.refreshToken } })
        .pipe(map(data => {
          console.log(data)
          if (data) {
              localStorage.setItem('currentToken', JSON.stringify(data.tokens));
              this.currentTokenSubject.next(data.tokens);
              location.reload(true);
          }
          return data;
      }));
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentToken');
        this.currentUserSubject.next(null);
        this.currentTokenSubject.next(null);
    }



  }
