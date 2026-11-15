import { ResponseGeneral } from "../../../../shared/intercambios/response/ResponseGeneral.response";
import { EmpresaModel } from "../../model/EmpresaModel.model";

export class ResponseListaEmpresa extends ResponseGeneral {
  empresas: EmpresaModel[] = []
}
