import { Sucursal } from './Sucursal';
export interface CargoSucursal {
  codCargoSucursal?: number;
  codSucursal?:      number;
  codCargo?:         number;
  audUsuario?:       number;
  sucursal?:         Sucursal;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCargoSucursal(json: string): CargoSucursal {
      return JSON.parse(json);
  }

  public static cargoSucursalToJson(value: CargoSucursal): string {
      return JSON.stringify(value);
  }
}
