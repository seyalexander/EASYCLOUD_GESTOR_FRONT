import { ResponseGeneral } from "../../../../shared/intercambios/response/ResponseGeneral.response";
import { FamiliaModel } from "../../model/familiaModel.model";

export class ResponseListarFamilia extends ResponseGeneral {
  familia: FamiliaModel[] = [];
}
