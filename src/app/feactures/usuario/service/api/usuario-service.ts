import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseListaUsuarios } from '../../intercambios/response/ResponsetListarUsuarios.response';
import { Observable } from 'rxjs';
import { RequestListarUsuario } from '../../intercambios/request/RequestListarUsuarios.request';
import { RequestRegistrarUsuario } from '../../intercambios/request/RequestRegistrarUsuario.request';
import { ResponseRegistroUsuario } from '../../intercambios/response/ResponseRegistrarUsuario.response';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly url = environment.api;

  public ListarUsuarios(req: RequestListarUsuario): Observable<ResponseListaUsuarios> {
    let params = new HttpParams();

    if (req.estado !== undefined) {
      params = params.set('estado', req.estado);
    }

    return this.httpClient.get<ResponseListaUsuarios>(`${this.url}/v1/usuario`, {
      params,
    });
  }

  public RegistrarUsuario(request: RequestRegistrarUsuario): Observable<ResponseRegistroUsuario> {
    return this.httpClient.post<ResponseRegistroUsuario>(`${this.url}/v1/usuario`, request);
  }

  // public EditarAllRol(request: RequestEditarAllRol): Observable<ResponseEditarAllRol> {
  //   return this.httpClient.put<ResponseEditarAllRol>(`${this.url}/v1/rol`, request);
  // }

  // public AnularRol(idRol: number) {
  //   return this.httpClient.delete<ResponseEditarEstadoRol>(`${this.url}/v1/rol/${idRol}`);
  // }

  // public ActivarRol(idRol: number) {
  //   return this.httpClient.patch<ResponseEditarEstadoRol>(
  //     `${this.url}/v1/rol/${idRol}/activar`,
  //     {},
  //   );
  // }

  constructor(private httpClient: HttpClient) {}
}
