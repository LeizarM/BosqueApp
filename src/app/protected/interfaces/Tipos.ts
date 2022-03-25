export interface Tipos {

  codTipos?:  string;
  nombre?:    string;
  codGrupo?:  number;
  listTipos?: Tipos[];
  label?:     string;
  value?:     number;

}

/** ==========================================================
  * ======================= Metodos ===========================
  *============================================================*/

  /**
   * Devolvera un lista de los estados de las propuestas
   */

export function lstEstadosPropuesta(): Tipos[] {
 let lstTemp : Tipos[] = [];
 lstTemp.push(
      {
         codTipos: '0',
         nombre: 'Pendiente',
         codGrupo: 38,
         label: 'Pendiente',
         value: 0
      },
      {
         codTipos: '1',
         nombre: 'Aprobada',
         codGrupo: 38,
         label: 'Aprobada',
         value: 1
      },
      {
       codTipos: '2',
       nombre: 'No Aprobada',
       codGrupo: 38,
       label: 'No Aprobada',
       value: 2
      }
  );
 return lstTemp;
}

