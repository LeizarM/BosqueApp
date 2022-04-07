import { CargoSucursal } from "./CargoSucursal";

export interface EmpleadoCargo {
  codEmpleado:         number;
  codCargoSucursal:    number;
  codCargoSucPlanilla: number;
  fechaInicio:         Date;
  audUsuario:          number;
  cargoSucursal:       CargoSucursal;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toEmpleadoCargo(json: string): EmpleadoCargo {
      return JSON.parse(json);
  }

  public static empleadoCargoToJson(value: EmpleadoCargo): string {
      return JSON.stringify(value);
  }
}
