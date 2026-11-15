import { ResponseGeneral } from "../../../../shared/intercambios/response/ResponseGeneral.response";
import { UnidadMedidaModel } from "../../model/UnidadMedidaModel.model";

export class ResponseListaUnidadMedida extends ResponseGeneral {
    unidadesMedida: UnidadMedidaModel[] = []
}