import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage-angular';

const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URI = environment.apiUrl;
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization' : 'Bearer ' + localStorage.getItem(TOKEN_KEY)
  });

  constructor(private http: HttpClient, private storage: Storage) { }

  /**
   * Genera una petición Get a la Api
   * @param model Url a Api controlador/action
   */
  get(model) {
    const options = {
      headers: this.headers
    };
    return this.http.get(`${this.API_URI}` + model, options).pipe( tap(  ) );
  }
  /**
   * Genera una petición Post a la Api
   * @param model Url a Api controlador/action
   * @param data Json de datos a enviar
   */
  post(model, data) {
    const params = new URLSearchParams(data);
    const options = {
      headers: this.headers
    };
    return this.http.post(`${this.API_URI}` + model, params.toString(), options);
  }
  /**
   * Genera una petición Put a la Api
   * @param model Url a Api controlador/action
   * @param data Json de datos a enviar
   */
  put(model, data) {
    const params = new URLSearchParams(data);
    const options = {
      headers: this.headers
    };
    return this.http.put(`${this.API_URI}` + model + '/?id=' + data.id, params.toString(), options);
  }
  /**
   * Genera una petición Put a la Api
   * @param model Url a Api controlador/action
   * @param data Json con 'id' de registro a eliminar
   */
  delete(model, data) {
    const options = {
      headers: this.headers
    };
    return this.http.delete(`${this.API_URI}` + model + '/?id=' + data.id, options);
  }
}
