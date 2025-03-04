import * as yup from 'yup'
import { IbasicVal } from '@/interfaces/validation.interface';

const msgReq = 'Campo Requerido'
const msgDni = 'Campo de 8 caracteres'
const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

const validationSchema = yup.object<IbasicVal>({
    tipo_solicitud: yup.string().required(msgReq).default('EXAMEN_DE_UBICACION'),    
    dni: yup.string().required(msgReq).trim().min(8, msgDni).max(8, msgDni),
    email: yup.string().required(msgReq).matches(emailRegex, 'Ingrese un correo electrónico válido')
})

const initialValues = {
    tipo_solicitud: 'EXAMEN_DE_UBICACION',
    dni: '',
    email: '',
    trabajador: false,
    alumno_ciunac: false
}

export { validationSchema, initialValues }
