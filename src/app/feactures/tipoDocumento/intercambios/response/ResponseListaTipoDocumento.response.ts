import { ResponseGeneral } from "../../../../shared/intercambios/response/ResponseGeneral.response";
import { TipoDocumentoModel } from "../../model/TipoDocumentoModel.model";

export class ResponseListaTipoDocumento extends ResponseGeneral{
  tipoDocumentos: TipoDocumentoModel[] = []
}
