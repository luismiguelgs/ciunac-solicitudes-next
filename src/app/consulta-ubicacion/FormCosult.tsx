'use client'
import { Box, Button, LinearProgress, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ReCAPTCHA from "react-google-recaptcha";
import React from 'react'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { MyDialog } from '@/components/mui';
import SolicitudesExamenService from '@/services/solicitud-examen.service';
import IsolUbicacion from '@/interfaces/IsolUbicacion';

const dniRequired = 'DNI es un campo requerido'
const dniLength = 'DNI debe ser de 8 digitos' 

const validationSchema = yup.object({
    dni: yup.string().required(dniRequired).trim().min(8, dniLength).max(8, dniLength),
})

export default function FormConsult() 
{
    const router = useRouter()
    const [disabled, setDisabled] = React.useState<boolean>(false)
    const [errorMsg, setErrorMsg] = React.useState<string>('') //Error Message
    const [open, setOpen] = React.useState<boolean>(false) //Alert
    const captchaRef = React.useRef<ReCAPTCHA>(null)
    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });
    const formik = useFormik({
        initialValues:{
            dni: '',
        },
        validationSchema,
        onSubmit: async(values)=> {
            setDisabled(true)
            if(!captchaRef.current?.getValue()){
                setErrorMsg('Captcha es un campo requerido')
                setOpen(true)
                setDisabled(false)
            }else{
                const result = await SolicitudesExamenService.getUbication(values.dni) as IsolUbicacion[]
                if(result.length > 0){  
                    const item = result[0]
                    const queryParams = new URLSearchParams(
                        Object.entries({apellidos: item.apellidos.trim(), nombres: item.nombres.trim()}).reduce((acc, [key, value]) => {
                          acc[key] = String(value);
                          return acc;
                        }, {} as Record<string, string>)
                      ).toString(); 
                    router.push(`./consulta-ubicacion/${values.dni}?${queryParams}`);
                }else{
                    setOpen(true)
                    setDisabled(false)
                    setErrorMsg('No tiene solicitudes resgistradas')
                }
            }
        }
    })

    return (
        <>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} >
                <TextField
                    margin="normal"
                    inputRef={dniRef}
                    required
                    fullWidth
                    value={formik.values.dni}
                    label="DNI"
                    name="dni"
                    error={formik.touched.dni && Boolean(formik.errors.dni)}
                    autoComplete="dni"
                    autoFocus
                    onChange={formik.handleChange}
                    helperText={formik.touched.dni && formik.errors.dni}
                />
                <ReCAPTCHA sitekey={String(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)} ref={captchaRef} />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={disabled}>{disabled? 'Buscando...':'Buscar'}</Button>
                <LinearProgress color='secondary' variant='indeterminate' sx={{ display: disabled ? 'block' : 'none' , mt: 1, mb: 1}}/>
            </Box>
            <MyDialog 
                content={errorMsg}
                open={open}
                setOpen={setOpen}
                title='Error'
                type='SIMPLE'
            />
        </>
    )
}
