import { ResponseGeneral } from "../../../../shared/intercambios/response/ResponseGeneral.response";
import { EmpleadoModel } from "../../model/EmpleadoModel.model";

export class ResponseListaEmpleados extends ResponseGeneral {
  empleados: EmpleadoModel[] = []
}
