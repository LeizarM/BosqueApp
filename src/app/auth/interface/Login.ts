import { Sucursal } from '../../protected/sucursal/interface/Sucursal';
import { Empleado } from '../../protected/interfaces/Empleado';


export interface Login {
    codUsuario?:        number;
    codEmpleado?:       number;
    login?:             string;
    password?:          string;
    tipoUsuario?:       string;
    esAutorizador?:     string;
    estado?:            string;
    audUsuarioI?:       number;
    elTemaSelecionado?: string;
    empleado?:          Empleado;
    sucursal?:          Sucursal;

    //atributos auxiliares
    nombreCompleto?:    string;
    cargo?:             string;
    codEmpresa?:        number;
    token?:             string;
    ok?:                boolean;
    authoriy?:          Authority[];
}


export interface Authority {
  authority?: string;
}


// Converts JSON strings to/from your types
export class Convert {
    public static toLogin(json: string): Login {
        return JSON.parse(json);
    }

    public static loginToJson(value: Login): string {
        return JSON.stringify(value);
    }
}
