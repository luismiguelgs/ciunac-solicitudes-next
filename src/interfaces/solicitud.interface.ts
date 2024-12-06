import { Timestamp } from "firebase/firestore";

export default interface Isolicitud {
    id?:string,
    tipo_solicitud:string,
    antiguo:boolean,
    apellidos:string,
    nombres:string,
    celular:string,
    certificado_trabajo?:string,
    codigo?:string,
    dni:string,
    email:string,
    idioma:string,
    nivel:string,
    numero_voucher?:string,
    facultad?:string,
    fecha_pago?:string,
    timestamp?:string,
    trabajador:boolean,
    voucher?:string,
    estado?:string,
    pago:number,
    alumno_ciunac?:boolean,
    img_cert_trabajo?:string,
    img_cert_estudio?:string,
    creado?:string | Timestamp
}