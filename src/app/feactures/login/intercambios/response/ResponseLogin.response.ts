import { ResponseGeneral } from "../../../../shared/intercambios/response/ResponseGeneral.response";

export class ResponseLogin extends ResponseGeneral {
  token: string = ''
  nombre: string = ''
  apellido: string = ''
  descripcionRol: string = ''
  idRol: number = 0
}
