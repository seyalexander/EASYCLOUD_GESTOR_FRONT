import { ResponseGeneral } from "../../../../shared/intercambios/response/ResponseGeneral.response";
import { FamiliaModel } from "../../model/familiaModel.model";

export class ResponseDetalleFamilia extends ResponseGeneral {
    familia: FamiliaModel = {} as FamiliaModel;
}
