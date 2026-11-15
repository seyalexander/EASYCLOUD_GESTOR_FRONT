import { RolModel } from './../../model/rolModel.model';
import { ResponseGeneral } from "../../../../shared/intercambios/response/ResponseGeneral.response";

export class ResponseListaRol extends ResponseGeneral {
  roles: RolModel[] = []
}
