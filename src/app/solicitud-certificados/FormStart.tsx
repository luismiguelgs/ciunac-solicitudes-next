'use client'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './start.schema';
import { IbasicVal } from '@/interfaces/validation.interface';
import  Grid from '@mui/material/Grid2';
import SelectRequest from '@/components/SelectRequest';
import EmailIcon from '@mui/icons-material/Email';
import { useMask } from '@react-input/mask';
import Warning from '@/components/Warning';
import useStore from '@/hooks/useStore';
import { useTextsStore } from '@/stores/types.stores';
import TypesService from '@/services/types.service';
import ReCAPTCHA from "react-google-recaptcha";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { MySnackBar } from '@/components/mui';
import { useRouter } from 'next/navigation';
import { ITipoSolicitud } from '@/interfaces/type.interface';

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
                router.push(`./solicitud-certificados/proceso?${queryParams}`);
            }
        },
    })
    
    return (
        <Box component={'form'} sx={{p:2}} noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} >
                <Grid size={{xs:12}} justifyContent="center" display={'flex'} alignItems={'center'}>
                    <SelectRequest 
                        helperText="Seleccione el tipo de solicitud"
                        value={formik.values.tipo_solicitud}
                        error={formik.touched.tipo_solicitud && Boolean(formik.errors.tipo_solicitud)}
                        handleChange={formik.handleChange}
                    />
                </Grid>
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
                        checked={formik.values.trabajador}
                        handleChange={formik.handleChange}
                        label="Trabajador UNAC"
                        mensaje="Hacer click si usted es trabajador."
                        name="trabajador" />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Warning
                        texto={textos?.find(objeto=> objeto.titulo === 'texto_2_inicio')?.texto}
                        checked={formik.values.antiguo}
                        handleChange={formik.handleChange}
                        label="Matriculado anterior al año 2010"
                        mensaje="Hacer click si usted termino antes del 2010."
                        name="antiguo" />
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
