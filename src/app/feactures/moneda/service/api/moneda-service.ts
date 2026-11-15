import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestListaMoneda } from '../../intercambios/request/RequestListaMoneda.request';
import { Observable } from 'rxjs';
import { ResponseListaMoneda } from '../../intercambios/response/ResponseListaMoneda.response';
import { RequestRegistrarMoneda } from '../../intercambios/request/RequestRegistroMoneda.request';
import { ResponseRegistroTipoDocumento } from '../../../tipoDocumento/intercambios/response/ResponseRegistroTipoDocumento.response';
import { ResponseRegistroMoneda } from '../../intercambios/response/ResponseRegistroMoneda.response';
import { ResponseEditarEstadoMoneda } from '../../intercambios/response/ResponseEditarEstadoMoneda.response';
import { ResponseEditarPredeterminadoMoneda } from '../../intercambios/response/ResponseEditarPredeterminadaMoneda.requet';
import { RequestEditarAllMoneda } from '../../intercambios/request/RequestEditarAllMoneda.request';
import { ResponseEditarAllMoneda } from '../../intercambios/response/ResponseEditarAllMoneda.response';

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  private readonly url = environment.api;

  public ListarMoneda(req: RequestListaMoneda): Observable<ResponseListaMoneda> {
    let params = new HttpParams();

    if (req.estado !== undefined) {
      params = params.set('estado', req.estado);
    }

    return this.httpClient.get<ResponseListaMoneda>(`${this.url}/v1/moneda`, {
      params,
    });
  }

  public RegistrarMoneda(
    request: RequestRegistrarMoneda,
  ): Observable<ResponseRegistroTipoDocumento> {
    return this.httpClient.post<ResponseRegistroMoneda>(`${this.url}/v1/moneda`, request);
  }

  public AnularMoneda(idMoneda: number) {
    return this.httpClient.delete<ResponseEditarEstadoMoneda>(`${this.url}/v1/moneda/${idMoneda}`);
  }

  public ActivarMoneda(idMoneda: number) {
    return this.httpClient.patch<ResponseEditarEstadoMoneda>(
      `${this.url}/v1/moneda/${idMoneda}/activar`,
      {},
    );
  }

  public PredeterminadoMoneda(idMoneda: number) {
    return this.httpClient.patch<ResponseEditarPredeterminadoMoneda>(
      `${this.url}/v1/moneda/${idMoneda}/predeterminado`,
      {},
    );
  }

  public EditarAllMoneda(request: RequestEditarAllMoneda): Observable<ResponseEditarAllMoneda> {
    return this.httpClient.put<ResponseEditarAllMoneda>(`${this.url}/v1/moneda`, request);
  }

  constructor(private httpClient: HttpClient) {}
}
