export interface Sucursal {
  codSucursal?:   number;
  nombre?:        string;
  codEmpresa?:    number;
  codCiudad?:     number;
  audUsuarioI?:   number;
  nombreEmpresa?: string;
  nombreCiudad?:  string;
}


// Converts JSON strings to/from your types
export class Convert {
  public static toSucursal(json: string): Sucursal {
      return JSON.parse(json);
  }

  public static sucursalToJson(value: Sucursal): string {
      return JSON.stringify(value);
  }
}
