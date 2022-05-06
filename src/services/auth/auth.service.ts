import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
import { take, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  
  constructor(
              private storage: Storage,
              private http: HttpClient,
              private plt: Platform,
              private router: Router
    ) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    let platformObs = from(this.plt.ready());
 
    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          let decoded = helper.decodeToken(token); 
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }
 
  login(credentials: {email: string, password: string }) {
    const params = new URLSearchParams(credentials);
    const options = {
      headers: this.headers
    };

    return this.http.post(`${environment.apiUrl}auth/login`, params.toString(), options).pipe(
      take(1),
      map(res => {
        console.log(res)
        return res;
      }),
      switchMap(data => {
        let decoded = helper.decodeToken(data['access_token']);
        console.log(decoded);
        let userData = JSON.stringify({
          email: decoded['email'],
          id: decoded['id'],
          name: decoded['name'],
          role: decoded['role']
      });
        this.userData.next(userData);
        console.log(this.userData)
        console.log(data)
        let storageObs = from(this.storage.set(TOKEN_KEY, data['access_token']));
        localStorage.setItem(TOKEN_KEY, data['access_token']);
        localStorage.setItem('currentUser', JSON.stringify(data['user']));
        return storageObs;
      })
    );
  }
 
  getUser() {
    return this.userData.getValue();
  }
 
  async logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.clear();
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }
}
