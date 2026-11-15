import { ResponseGeneral } from "../../../../shared/intercambios/response/ResponseGeneral.response";
import { SubFamiliaModel } from "../../model/subFamiliaMode.model";

export class ResponseListaSubFamilia extends ResponseGeneral {
  subfamilias: SubFamiliaModel[] = [];
}
