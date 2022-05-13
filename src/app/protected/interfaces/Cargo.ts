import { CargoSucursal } from "./CargoSucursal";



export interface Cargo {
  codCargo?:        number;
  codCargoPadre?:   number;
  descripcion?:     string;
  codEmpresa?:      number;
  codNivel?:        number;
  posicion?:        number;
  audUsuario?:      number;
  nombreEmpresa?:   string;
  descripcionCargoPlanilla?: string;

}

// Converts JSON strings to/from your types
export class Convert {
  public static toCargo(json: string): Cargo {
      return JSON.parse(json);
  }

  public static cargoToJson(value: Cargo): string {
      return JSON.stringify(value);
  }
}
