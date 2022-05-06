import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/services/auth/auth.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  async getItem() {
    return await Storage.get({ key: TOKEN_KEY });
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const skipIntercept = request.headers.has('skip');

    if (skipIntercept) {
      request = request.clone({
        headers: request.headers.delete('skip')
      });
      return next.handle(request);
    }

    return from(this.getItem()).pipe(switchMap(value => {
      const token = value['value'];
      if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
      // if (!request.headers.has('Content-Type')) {
      //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
      // }
      // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {

          if (err.status === 401 || err.status === 403) {
            localStorage.removeItem(TOKEN_KEY)
            localStorage.clear();
            Storage.remove({ key: TOKEN_KEY });
            // Storage.clear();
            this.router.navigateByUrl('/sign-in');
            // this.toastr.error(this.translate.instant('app.request.unauthorized'));
          }
          return throwError(err);
        })
      );
    }));

  }

}
