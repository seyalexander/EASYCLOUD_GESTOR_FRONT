import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { RequestLogin } from '../../intercambios/request/RequestLogin.request';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../../intercambios/response/ResponseLogin.response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private readonly URL = environment.api;


  login(requestelogin: RequestLogin): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(`${this.URL}/v1/auth/login`, requestelogin, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private _userRole = signal<string>('ADMIN')

  role = computed(() => this._userRole())

  setRole(role: string) {
    this._userRole.set(role)
  }

  constructor(private readonly httpClient: HttpClient) { }

}
