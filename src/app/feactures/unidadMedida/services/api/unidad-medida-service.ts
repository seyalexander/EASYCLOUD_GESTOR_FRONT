import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestListaUnidadMedida } from '../../intercambios/request/RequestListaUnidadMedida.request';
import { ResponseListaUnidadMedida } from '../../intercambios/response/ResponseListaUnidadMedida.response';
import { Observable } from 'rxjs';
import { RequestRegistrarUnidadMedida } from '../../intercambios/request/RequestRegistrarUnidadMedida.request';
import { ResponseRegistrarUnidadMedida } from '../../intercambios/response/ResponseRegistrarUnidadMedida.response';

@Injectable({
  providedIn: 'root',
})
export class UnidadMedidaService {

  private readonly url = environment.api;

  public ListarUnidadMedida(req: RequestListaUnidadMedida): Observable<ResponseListaUnidadMedida> {
    let params = new HttpParams();


    if (req.estado !== undefined) {
      params = params.set('estado', req.estado);
    }

    return this.httpClient.get<ResponseListaUnidadMedida>(`${this.url}/v1/unidadMedida`, {
      params,
    });
  }

  public RegistrarUnidadMedida(request: RequestRegistrarUnidadMedida): Observable<ResponseRegistrarUnidadMedida> {
    return this.httpClient.post<ResponseRegistrarUnidadMedida>(`${this.url}/v1/unidadMedida`, request);
  }



  constructor(private httpClient: HttpClient) { }
}
