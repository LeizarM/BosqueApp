import { Persona } from '../../persona/interface/Persona';
import { Cargo } from '../../cargo/interface/Cargo';



export interface Empleado {
  codEmpleado?:        number;
  codPersona?:         number;
  numCuenta?:          number;
  codRelBeneficios?:   number;
  codRelPlanilla?:     number;
  audUsuarioI?:        number;
  persona?:            Persona;
  cargo?:              Cargo;
  codZona?:            number;
  nombres?:            string;
  apPaterno?:          string;
  apMaterno?:          string;
  ciExpedido?:         string;
  ciFechaVencimiento?: Date;
  ciNumuro?:           number;
  direccion?:          string;
  estadoCivil?:        string;
  fechaNacimiento?:    Date;
  lugarNacimiento?:    string;
  nacionalidad?:       number;
  sexo?:               string;
  datoPersona?:        string;
}


// Converts JSON strings to/from your types
export class Convert {
  public static toEmpleado(json: string): Empleado {
      return JSON.parse(json);
  }

  public static empleadoToJson(value: Empleado): string {
      return JSON.stringify(value);
  }
}
