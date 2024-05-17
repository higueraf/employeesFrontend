export interface EmpleadoInterface {
    id?: number,
    cedula?: string,
    nombres?: string,
    apellidos?: string,
    id_provincia?: number,
    fecha_nacimiento?: string,
    email?: string,
    observaciones?: string,
    foto?: File | null | string,
    fecha_ingreso?: string,
    cargo?: string,
    departamento?: string,
    jornada_parcial?: string,
    id_provincia_cargo?: number,
    codigo?: string;
    sueldo?: number;
    estado?: boolean;
    observaciones_cargo?: string,
    provincia?: any,
    provincia_cargo?: any,
}