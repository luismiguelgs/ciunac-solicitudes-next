export default interface IsolUbicacion{
    periodo: string,
    img_voucher?: string,
    img_dni?:string,
    img_cert_trabajo?: string,
    img_cert_estudio?:string,
    numero_voucher: string,
    tipo_solicitud: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fecha_pago: any,
    pago: number,
    idioma: string,
    nivel: string,
    dni: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    facultad?: string,
    email: string,
    codigo?: string,
    trabajador: boolean,
    alumno_ciunac: boolean,
}