import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestListaEmpresa } from '../../intercambios/request/RequestListaEmpresa.request';
import { Observable } from 'rxjs';
import { ResponseListaEmpresa } from '../../intercambios/response/ResponseListaEmpresa.response';
import { RequestRegistroEmpresa } from '../../intercambios/request/RequestRegistroEmpresa.request';
import { ResponseRegistrEmpresa } from '../../intercambios/response/ResponseRegistroEmpresa.response';
import { ResponseEditarEstadoEmpresa } from '../../intercambios/response/ResponseEditarEstadoEmpresa.response';
import { RequestEditarAllEmpresa } from '../../intercambios/request/RequestEditarAllEmpresa.request';
import { ResponseEditarAllEmpresa } from '../../intercambios/response/ResponseEditarAllEmpresa.response';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private readonly url = environment.api;

  public ListarEmpresa(req: RequestListaEmpresa): Observable<ResponseListaEmpresa> {
    let params = new HttpParams();

    if (req.estado !== undefined) {
      params = params.set('estado', req.estado);
    }

    return this.httpClient.get<ResponseListaEmpresa>(`${this.url}/v1/empresa`, {
      params,
    });
  }

  public RegistrarEmpresa(request: RequestRegistroEmpresa): Observable<ResponseRegistrEmpresa> {
    return this.httpClient.post<ResponseRegistrEmpresa>(`${this.url}/v1/empresa`, request);
  }

  public EditarAllEmpresa(
      request: RequestEditarAllEmpresa,
    ): Observable<ResponseEditarAllEmpresa> {
      return this.httpClient.put<ResponseEditarAllEmpresa>(
        `${this.url}/v1/empresa`,
        request,
      );
    }

  public AnularEmpresa(idEmpresa: number) {
    return this.httpClient.delete<ResponseEditarEstadoEmpresa>(
      `${this.url}/v1/empresa/${idEmpresa}`,
    );
  }

  public ActivarEmpresa(idEmpresa: number) {
    return this.httpClient.patch<ResponseEditarEstadoEmpresa>(
      `${this.url}/v1/empresa/${idEmpresa}/activar`,
      {},
    );
  }

  constructor(private httpClient: HttpClient) {}
}
