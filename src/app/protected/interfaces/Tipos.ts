
/**
 * Interfaz por defecto de Tipos
 */
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

/** =========================================================================
  * ===================================== Metodos ===========================
  *==========================================================================*/
/**
 * Devolvera una lista para determinar si esta activo o inactivo
 */
export function lstEstadoActivoInactivo(): Tipos[] {
  const lstTemp: Tipos[] = [];

  lstTemp.push(
    {
      codTipos: '1',
      nombre: 'Activo',
      codGrupo: 0,

    },
    {
      codTipos: '0',
      nombre: 'Inactivo',
      codGrupo: 0,
    }

  );

  return lstTemp;

}


/**
 * Devolvera una lista para determinar si esta activo o no o todos
 */
export function lstEstadoActivoInactivoTodos(): Tipos[] {
  const lstTemp: Tipos[] = [];

  lstTemp.push(
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
    {
      codTipos: '-1',
      nombre: 'Todos',
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
/**
 * Devolvera una lista del sexo
 */

export function lstSexo(): Tipos[] {
  const lstTemp: Tipos[] = [];

  lstTemp.push(
    {
      codTipos: 'F',
      nombre: 'Femenino',
      codGrupo: 1,

    },
    {
      codTipos: 'M',
      nombre: 'Masculino',
      codGrupo: 1,

    }
  );
  return lstTemp;
}

/**
 * Devolvera una lista del estado civil
 */
export function lstEstadoCivil():Tipos[]{
  const lstTemp: Tipos[] = [];

  lstTemp.push(
    {
      codTipos: 'sol',
      nombre: 'Soltero/a',
      codGrupo: 2,
    },
    {
      codTipos: 'cas',
      nombre: 'Casado/a',
      codGrupo: 2,
    },
    {
      codTipos: 'con',
      nombre: 'Concubino/a',
      codGrupo: 2,
    },
    {
      codTipos: 'div',
      nombre: 'Divorciado/a',
      codGrupo: 2,
    },
    {
      codTipos: 'viu',
      nombre: 'Viudo/a',
      codGrupo: 2,
    }
  );
  return lstTemp;
}
/**
 * Devolvera una lista del tipo de relacion de un empleado con una empresa
 */
 export function lstTipoRelEmp():Tipos[]{
  const lstTemp: Tipos[] = [];

  lstTemp.push(
    {
      codTipos: 'inde',
      nombre: 'Indefinido',
      codGrupo: 6,
    },
    {
      codTipos: 'pFijo',
      nombre: 'Plazo Fijo',
      codGrupo: 6,
    },
    {
      codTipos: 'pasa',
      nombre: 'Pasante',
      codGrupo: 6,
    },
  );
  return lstTemp;
}
/**
 * Devolvera una lista del nivel de educacion
 */
 export function lstTipoEducacion():Tipos[]{
  const lstTemp: Tipos[] = [];

  lstTemp.push(
    {
      codTipos: 'nin',
      nombre: 'Ninguno',
      codGrupo: 3,
    },
    {
      codTipos: 'pri',
      nombre: 'Primaria',
      codGrupo: 3,
    },
    {
      codTipos: 'sec',
      nombre: 'Secundaria',
      codGrupo: 3,
    },
    {
      codTipos: 'bac',
      nombre: 'Bachiller',
      codGrupo: 3,
    },
    {
      codTipos: 'tmed',
      nombre: 'Tecnico Medio',
      codGrupo: 3,
    },
    {
      codTipos: 'tsup',
      nombre: 'Tecnico Superior',
      codGrupo: 3,
    },
    {
      codTipos: 'uni',
      nombre: 'Universitario',
      codGrupo: 3
    },
    {
      codTipos: 'egr',
      nombre: 'Universitario/Egresado',
      codGrupo: 3
    },
    {
      codTipos: 'lic',
      nombre: 'Licenciatura',
      codGrupo: 3
    }
  );
  return lstTemp;
}

