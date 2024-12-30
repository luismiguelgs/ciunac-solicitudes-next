import * as Yup from "yup";

const msgReq = 'Campo requerido'
const msgTel = 'Campo de 9 digitos'

const validationSchema = Yup.object({
    apellidos: Yup.string().required(msgReq).trim(),
    nombres: Yup.string().required(msgReq).trim(),
    idioma: Yup.string().required(msgReq).trim(),
    nivel: Yup.string().required(msgReq).trim(),
    celular: Yup.string().required(msgReq).min(11, msgTel).max(11, msgTel),
    alumno: Yup.boolean(),
    facultad: Yup.string().trim().when('alumno',{
        is: true,
        then: (schema:Yup.Schema) => schema.required(msgReq),
        otherwise: (schema:Yup.Schema) => schema.optional().nullable()
    }),
    codigo: Yup.string().when('alumno', {
        is: true,
        then: (schema:Yup.Schema) => schema.required(msgReq),
        otherwise: (schema:Yup.Schema) => schema.optional().nullable()
    })

})

const initialValues = {
    apellidos: '',
    nombres: '',
    idioma: '',
    nivel: '',
    celular: '',
    alumno: false,
    facultad: 'PAR',
    codigo: ''
}

export {validationSchema, initialValues}