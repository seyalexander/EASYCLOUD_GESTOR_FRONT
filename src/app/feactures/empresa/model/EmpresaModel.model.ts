export class EmpresaModel {
  idEmpresa: number = 0;
  imagenUrl: string = '';
  razonSocial: string = '';
  ruc: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  logoUrl: string = '';
  estado: number = 0;

  // Auditoría
  fechaCreacion: string = '';
  fechaEdicion: string = '';
  fechaAnulacion: string = '';
  idUsuarioCreacion: number = 0;
  idUsuarioEdicion: number = 0;
  idUsuarioAnulacion: number = 0;
  usuarioCreacion: string = '';
  usuarioEdicion: string = '';
  usuarioAnulacion: string = '';
}
