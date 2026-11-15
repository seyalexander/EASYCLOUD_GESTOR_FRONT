import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestListarFamilias } from '../../intercambios/request/RequestListarFamilias.request';
import { Observable } from 'rxjs';
import { ResponseListarFamilia } from '../../intercambios/response/ResponseListarFamilias.response';
import { RequestRegistrarFamilia } from '../../intercambios/request/RequestRegistrarFamilia.request';
import { ResponseRegistrarFanilia } from '../../intercambios/response/ResponseRegistrarFamilia.response';
import { ResponseDetalleFamilia } from '../../intercambios/response/ResponseDetalleFamilia.response';

@Injectable({
  providedIn: 'root',
})
export class FamiliaService {
  private readonly url = environment.api;

  public ListarFamilias(req: RequestListarFamilias): Observable<ResponseListarFamilia> {
    let params = new HttpParams();


    if (req.estado !== undefined) {
      params = params.set('estado', req.estado);
    }

    return this.httpClient.get<ResponseListarFamilia>(`${this.url}/v1/familia`, {
      params,
    });
  }

  public RegistrarFamilia(request: RequestRegistrarFamilia): Observable<ResponseRegistrarFanilia> {
    return this.httpClient.post<ResponseRegistrarFanilia>(`${this.url}/v1/familia`, request);
  }

  public DetalleFamilia(idFamilia: number): Observable<ResponseDetalleFamilia> {
    return this.httpClient.get<ResponseDetalleFamilia>(`${this.url}/v1/familia/${idFamilia}`);
  }

  constructor(private httpClient: HttpClient) { }
}
