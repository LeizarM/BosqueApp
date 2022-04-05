import { Pais } from './Pais';
import { Ciudad } from './Ciudad';
import { Zona } from './Zona';
export interface Persona {
  codPersona?:         number;
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
  audUsuarioI?:        number;
  //variables de apoyo
  datoPersona?:        string;
  pais?:               Pais;
  ciudad?:             Ciudad;
  zona?:               Zona;
}


// Converts JSON strings to/from your types
export class Convert {
  public static toPersona(json: string): Persona {
      return JSON.parse(json);
  }

  public static personaToJson(value: Persona): string {
      return JSON.stringify(value);
  }
}
