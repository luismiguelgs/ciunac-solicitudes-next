import *  as yup from 'yup'
import Ibasicinfo from '../(interfaces)/basicinfo.interface'

const msgReq = 'Campo Requerido'
const msgCharacters = (n:number) => `Campo debe tener ${n} digitos`

const basicinfoSchema = yup.object<Ibasicinfo>({
    firstLastname: yup.string().required(msgReq).trim(),
    code_program: yup.string().required(msgReq).trim(),
    secondLastname: yup.string().required(msgReq).trim(),
    firstName: yup.string().required(msgReq).trim(),
    birthDate : yup.date().required(msgReq),
    secondName: yup.string().trim(),
    gender: yup.string().required(msgReq),
    document_type: yup.string().required(msgReq),
    phone: yup.string().required(msgReq).trim().min(9, msgCharacters(9)).max(9, msgCharacters(9)),
    document: yup.string().when('document_type', {
        is: 'PE02', 
        then: (schema:yup.Schema) => schema.required(msgReq).trim().min(9, msgCharacters(9)).max(9, msgCharacters(9)),
        otherwise: (schema:yup.Schema) => schema.required(msgReq).trim().min(8, msgCharacters(8)).max(8, msgCharacters(8)),
    })
})

export default basicinfoSchema