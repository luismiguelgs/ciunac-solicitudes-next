import { IfinVal } from "@/interfaces/validation.interface";
import * as Yup from "yup";
import uploadLogo from '@/assets/upload.svg'

const msgReq = 'Campo Requerido'

const validationSchema =  Yup.object<IfinVal>({
    pago: Yup.string().required(msgReq).min(0),
    numero_voucher: Yup.string().trim().when('pago',{
        is: "0",
        then:(schema:Yup.Schema) => schema.optional().nullable(),
        otherwise: (schema:Yup.Schema) => schema.required(msgReq),
    }),
    fecha_pago: Yup.date().when('pago',{
        is: "0",
        then:(schema:Yup.Schema) => schema.optional().nullable(),
        otherwise: (schema:Yup.Schema) => schema.required(msgReq),
    }),
    img_voucher: Yup.string().nullable()
})

const initialValues = {
    pago: '',
    numero_voucher: '',
    fecha_pago: '',
    img_voucher: uploadLogo.src
}

export{ validationSchema, initialValues}