export interface Tipos {

  codTipos: string;
  nombre: string;
  codGrupo: number;
}

/**
 * Interface Modificada para tratar filtros con PrimeNG
 */
export interface TiposMod {

  codTipos: string;
  nombre: string;
  codGrupo: number;
  label: string;
  value: string;

}

/** ==========================================================
  * ======================= Metodos ===========================
  *============================================================*/
/**
 * Devolvera una lista para determinar si esta activo o no
 */
export function lstEstadoActivoInactivo(): Tipos[] {
  const lstTemp: Tipos[] = [];

  lstTemp.push(
    {
      codTipos: '-1',
      nombre: 'Todos',
      codGrupo: 0,

    },
    {
      codTipos: '1',
      nombre: 'Activo',
      codGrupo: 0,

    },
    {
      codTipos: '0',
      nombre: 'Inactivo',
      codGrupo: 0,

    },
  );

  return lstTemp;

}

/**
 * Devolvera un lista de los estados de las propuestas del modulo de precios
 */
export function lstEstadosPropuesta(): TiposMod[] {
  const lstTemp: TiposMod[] = [];
  lstTemp.push(
    {
      codTipos: '0',
      nombre: 'Pendiente',
      codGrupo: 38,
      label: 'Pendiente',
      value: 'Pendiente'
    },
    {
      codTipos: '1',
      nombre: 'Aprobada',
      codGrupo: 38,
      label: 'Aprobada',
      value: 'Aprobada'
    },
    {
      codTipos: '2',
      nombre: 'No Aprobada',
      codGrupo: 38,
      label: 'No Aprobada',
      value: 'No Aprobada'
    }
  );
  return lstTemp;
}

