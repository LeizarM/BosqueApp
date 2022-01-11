import { Sucursal } from '../../protected/sucursal/interface/Sucursal';
import { Empleado } from '../../protected/empleado/interface/Empleado';


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
