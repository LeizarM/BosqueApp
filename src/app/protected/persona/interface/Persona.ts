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
  datoPersona?:        string;
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
