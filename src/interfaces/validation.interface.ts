export interface IbasicVal{
    tipo_solicitud: string,
    email:string,
    dni:string,
    trabajador: boolean,
    antiguo: boolean
}
export interface IfinVal{
    img_voucher:string,
    numero_voucher:string,
    pago:string,
    fecha_pago:string
}
export interface IstudentVal{
    apellidos:string,
    nombres:string,
    celular:string
    idioma:string,
    nivel:string,
    codigo:string,
    alumno?: boolean,
    facultad:string
}
export interface IdocumentVal{
    cert_trabajador:boolean,
    cert_ciunac: boolean
}