import *  as yup from 'yup'
import Iverfication from '../(interfaces)/verification.interface'

const msgReq = 'Campo Requerido'
const msgCharacters = (n:number) => `Campo debe tener ${n} digitos`
const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

const verificationSchema = yup.object<Iverfication>({
    email: yup.string().required(msgReq).matches(emailRegex, 'Ingrese un correo electrónico válido'),
    code : yup.string().required(msgReq).min(7,msgCharacters(4)).max(7, msgCharacters(4))   
})

export default verificationSchema