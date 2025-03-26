import * as yup from 'yup'
import { IbasicVal } from '@/interfaces/validation.interface';

const msgReq = 'Campo Requerido'
const msgDni = 'Campo de 8 caracteres'
const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

const validationSchema = yup.object<IbasicVal>({
    tipo_solicitud: yup.string().required(msgReq).default('CERTIFICADO_DE_ESTUDIO'),    
    dni: yup.string().required(msgReq).trim().min(8, msgDni).max(8, msgDni),
    email: yup.string().required(msgReq).matches(emailRegex, 'Ingrese un correo electrónico válido'),
    trabajador: yup.boolean(),
    antiguo: yup.boolean(),
    tipo_trabajador: yup.string().when('trabajador',{
        is: true,
        then: (schema:yup.Schema) => schema.required(msgReq),
        otherwise: (schema:yup.Schema) => schema.optional().nullable()
    }),
})

const initialValues = {
    tipo_solicitud: 'CERTIFICADO_DE_ESTUDIO',
    dni: '',
    email: '',
    trabajador: false,
    antiguo: false,
    tipo_trabajador: '',
}

export { validationSchema, initialValues }
