import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { RequestLogin } from '../../intercambios/request/RequestLogin.request';
import { ResponseLogin } from '../../intercambios/response/ResponseLogin.response';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {

  private apiUrl = environment.api + '/v1/auth';
  private tokenKey = 'auth_token';
  private roleKey = 'user_role';


  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;


  private _userRole = signal<string | null>(null);
  role = computed(() => this._userRole());

  constructor(private http: HttpClient) {

    const token = this.getToken();
    const role = sessionStorage.getItem(this.roleKey);

    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!token);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


    if (role) {
      this._userRole.set(role);
    }
  }


  login(loginRequest: RequestLogin): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((response: ResponseLogin) => {
        if (response.exito && response.token) {
          sessionStorage.setItem(this.tokenKey, response.token);
          sessionStorage.setItem(this.roleKey, response.descripcionRol);
          this._userRole.set(response.descripcionRol);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }


  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.roleKey);

    this._userRole.set(null);
    this.isAuthenticatedSubject.next(false);
  }


  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = this.parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const exp = payload['exp'] as number;

      return exp > currentTime;
    } catch {
      return false;
    }
  }

  private parseJwt(token: string): Record<string, any> {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch {
      throw new Error('Error al parsear JWT');
    }
  }
}
