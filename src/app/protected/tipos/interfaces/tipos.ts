export interface Tipos {

  codTipos?:  string;
  nombre?:    string;
  codGrupo?:  number;
  listTipos?: Tipos[];

}

// Converts JSON strings to/from your types
export class Convert {

  public static toTipos(json: string): Tipos {
      return JSON.parse(json);
  }

  public static tiposToJson(value: Tipos): string {
      return JSON.stringify(value);
  }

}

