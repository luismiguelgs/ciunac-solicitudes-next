import * as Yup from "yup";

const msgReq = 'Debes aceptar los términos y condiciones'

const validationSchema =  Yup.object({
    agree: Yup.boolean().oneOf([true], msgReq),
    term : Yup.boolean().oneOf([true], msgReq)
})

const initialValues = {
    agree: false,
    term: false
}

export{ validationSchema, initialValues}