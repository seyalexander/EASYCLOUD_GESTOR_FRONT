import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestListaSubFamilia } from '../../intercambios/request/RequestListaSubFamilia.request';
import { Observable } from 'rxjs';
import { ResponseListaSubFamilia } from '../../intercambios/response/ResponseListaSubFamilia.response';
import { RequestRegistrarSubFamilia } from '../../intercambios/request/RequestRegistroSubFamilia.request';
import { ResponseRegistroSubFamilia } from '../../intercambios/response/ResponseRegistroSubFamilia.response';

@Injectable({
  providedIn: 'root',
})
export class SubfamiliaService {
  private readonly url = environment.api;

  public ListarSubFamilias(req: RequestListaSubFamilia): Observable<ResponseListaSubFamilia> {
    let params = new HttpParams();

    if (req.estado !== undefined) {
      params = params.set('estado', req.estado);
    }

    return this.httpClient.get<ResponseListaSubFamilia>(`${this.url}/v1/subfamilia`, {
      params,
    });
  }

  public RegistrarSubFamilia(request: RequestRegistrarSubFamilia): Observable<ResponseRegistroSubFamilia> {
    return this.httpClient.post<ResponseRegistroSubFamilia>(`${this.url}/v1/subfamilia`, request);
  }

  // public RegistrarFamilia(request: RequestRegistrarFamilia): Observable<ResponseRegistrarFanilia> {
  //   return this.httpClient.post<ResponseRegistrarFanilia>(`${this.url}/v1/familia`, request);
  // }

  constructor(private httpClient: HttpClient) {}
}
