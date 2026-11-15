import { ResponseGeneral } from '../../../../shared/intercambios/response/ResponseGeneral.response';
import { MonedaModel } from './../../model/MonedaModel.model';


export class ResponseListaMoneda extends ResponseGeneral {
  monedas: MonedaModel[] = []
}
