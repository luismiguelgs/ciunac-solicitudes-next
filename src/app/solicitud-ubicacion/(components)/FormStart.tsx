'use client'
import useStore from '@/hooks/useStore'
import { useTextsStore } from '@/stores/types.stores'
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import TypesService from '@/services/types.service';
import { useMask } from '@react-input/mask';
import { IbasicVal } from '@/interfaces/validation.interface';
import { initialValues, validationSchema } from '../start.schema';
import { ITipoSolicitud } from '@/interfaces/type.interface';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import  Grid from '@mui/material/Grid2';
import EmailIcon from '@mui/icons-material/Email';
import Warning from '@/components/Warning';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { MySnackBar } from '@/components/mui';


export default function FormStart({certificados}:{certificados?:ITipoSolicitud[]}) 
{
    let textos = useStore(useTextsStore, (state) => state.textos)
    const captchaRef = React.useRef<ReCAPTCHA>(null)
    const router = useRouter()

    //estado de snackbar informativo
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        const texts = async () => {
            textos = await TypesService.fetchTextos()
            useTextsStore.setState({ textos: textos })
        }
        if(!textos) texts()
    }, [])
    

    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });

    const formik = useFormik<IbasicVal>({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const precio = certificados?.filter((cer)=> cer.value === values.tipo_solicitud)[0].precio
            if(!captchaRef.current?.getValue()){
                setOpen(true)
            }else{
                setOpen(false)
                const queryParams = new URLSearchParams(
                    Object.entries({...values, pago: precio}).reduce((acc, [key, value]) => {
                      acc[key] = String(value);
                      return acc;
                    }, {} as Record<string, string>)
                  ).toString();
                router.push(`./solicitud-ubicacion/proceso?${queryParams}`);
            }
        },
    })
    return (
        <Box component={'form'} sx={{p:2}} noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} >
                <Grid size={{xs:12, md:6}}>
                    <TextField      
                        required
                        name='email'
                        fullWidth
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        label="Email"
                        slotProps={{ input:{
                            startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>),
                        }}}
                        variant="outlined"
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <TextField
                        inputRef={dniRef}
                        required
                        fullWidth
                        error={formik.touched.dni && Boolean(formik.errors.dni)}
                        value={formik.values.dni}
                        onChange={formik.handleChange}
                        name="dni"
                        label="DNI"
                        helperText={formik.touched.dni && formik.errors.dni}
                    />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Warning
                        texto={textos?.find(objeto=> objeto.titulo === 'texto_1_inicio')?.texto}
                        checked={formik.values.trabajador as boolean}
                        handleChange={formik.handleChange}
                        label="Trabajador UNAC"
                        mensaje="Hacer click si usted es trabajador."
                        name="trabajador" />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Warning
                        texto={textos?.find(objeto=> objeto.titulo === 'texto_ubicacion_1')?.texto}
                        checked={formik.values.antiguo as boolean}
                        handleChange={formik.handleChange}
                        label="Alumno CIUNAC (CENTRO DE IDIOMAS UNAC)"
                        mensaje="Hacer click si usted es alumno de CIUNAC."
                        name="alumno_ciunac" />
                </Grid>
                <Grid size={{xs:12, md:6}} justifyContent="center" display={'flex'} alignItems={'center'}>
                    <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string} ref={captchaRef} />
                </Grid>
                <Grid size={{xs:12, md:6}} justifyContent="center" display={'flex'} alignItems={'center'}>
                    <Button type="submit" variant="contained" size="large" endIcon={<PlayCircleFilledIcon />} sx={{m:2}}>
                        Avanzar
                    </Button>
                </Grid>
            </Grid>
            <MySnackBar 
                open= {open}
                content="Ingresar los datos solicitados RE-CAPTCHA"
                setOpen={setOpen}
                variant="filled"
                severity="error" />
        </Box>
    )
}
