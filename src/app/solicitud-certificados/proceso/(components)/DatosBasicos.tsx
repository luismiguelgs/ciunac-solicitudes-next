'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import React from 'react'
import { Alert, Box, InputAdornment, TextField } from '@mui/material';
import { IstudentVal } from '@/interfaces/validation.interface';
import { useMask } from '@react-input/mask'
import { MySelect, MySwitch } from '@/components/mui';
import { NIVEL } from '@/libs/constants';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ControlStepper from './ControlStepper';
import useStore from '@/hooks/useStore';
import { useFacultiesStore, useSubjectsStore, useTextsStore } from '@/stores/types.stores';
import useStoreRequest from '@/stores/request.store';
import Grid from '@mui/material/Grid2';

const msgReq = 'Campo requerido'
const msgTel = 'Campo de 9 digitos'

type Props = {
    onSubmit : (values:any) => void
    handleBack : () => void
    activeStep: number
}

export default function DatosBasicos({onSubmit, activeStep, handleBack}:Props) 
{
    //hooks
    const textos = useStore(useTextsStore, (state) => state.textos)
    const data = useStore(useStoreRequest, (state) => state.request)
    const cursos = useStore(useSubjectsStore, (state) => state.subjects)
    const facultades = useStore(useFacultiesStore, (state) => state.faculties)
    
    let validationSchema = Yup.object<IstudentVal>({
        apellidos: Yup.string().required(msgReq).trim(),
        nombres: Yup.string().required(msgReq).trim(),
        idioma: Yup.string().required(msgReq),
        nivel: Yup.string().required(msgReq),
        telefono: Yup.string().required(msgReq).min(11, msgTel).max(11, msgTel),
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

    const apellidoRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const nombreRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const celularRef = useMask({ mask: '___-___-___', replacement: { _: /\d/ } });
    const codigoRef = useMask({ mask: '__________', replacement: { _: /^[a-zA-Z0-9_]*$/ } });

    const formik = useFormik<IstudentVal>({
        initialValues: { 
            apellidos: data?.apellidos ?? '',
            nombres: data?.nombres ?? '',
            idioma: data?.idioma ?? '',
            nivel: data?.nivel ?? '',
            telefono: data?.celular ?? '',
            alumno: false,
            facultad: data?.facultad ?? 'PAR',
            codigo: data?.codigo || ''
        },
        validationSchema,
        onSubmit: values => { 
           onSubmit(values)
        }
    })    
    
    return (
        <React.Fragment>
            <Box component='form' onSubmit={formik.handleSubmit} sx={{flexGrow: 1, p:1}} noValidate autoComplete='off'>
                <Grid container spacing={2}>
                    <Grid size={{xs:12}}>
                        <Alert severity="warning">
                            {textos?.find(objeto=> objeto.titulo === 'texto_1_basico')?.texto}
                        </Alert>
                    </Grid>
                    <Grid size={{xs:12, md:6}}>
                            <TextField 
                                inputRef={apellidoRef}
                                required
                                fullWidth
                                name='apellidos'
                                onBlur={formik.handleBlur}
                                error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
                                value={formik.values.apellidos}
                                onChange={formik.handleChange}
                                label="Apellidos"
                                sx={{m:0.5}}
                                helperText={formik.touched.apellidos && formik.errors.apellidos ? formik.errors.apellidos : ''}
                            />
                    </Grid>
                        <Grid size={{xs:12, md:6}} >
                            <TextField
                                inputRef={nombreRef}
                                required
                                fullWidth
                                name='nombres'
                                onBlur={formik.handleBlur}
                                error={formik.touched.nombres && Boolean(formik.errors.nombres)}
                                value={formik.values.nombres}
                                onChange={formik.handleChange}
                                label="Nombres"
                                sx={{m:0.5}}
                                helperText={formik.touched.nombres && formik.errors.nombres ? formik.errors.nombres : ''}
                            />
                        </Grid> 
                        <Grid size={{xs:12, md:6}}>
                            <MySelect 
                                name="idioma"
                                label="Idioma"
                                sx={{m:0.5}}
                                value={formik.values.idioma}
                                handleChange={formik.handleChange}
                                helperText="Seleccionar el idioma"
                                data={cursos}
                            />
                        </Grid>
                        <Grid size={{xs:12, md:6}}>
                            <MySelect 
                                name="nivel"
                                label="Nivel"
                                sx={{m:0.5}}
                                value={formik.values.nivel}
                                handleChange={formik.handleChange}
                                helperText="Seleccionar el nivel"
                                data={NIVEL}
                            />
                        </Grid>
                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                inputRef={celularRef}
                                required
                                fullWidth
                                sx={{m:0.5}}
                                name='telefono'
                                onBlur={formik.handleBlur}
                                error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                type='text'
                                label="Celular"
                                slotProps={{ input:{
                                    startAdornment: (<InputAdornment position="start"><WhatsAppIcon /></InputAdornment>),
                                }}}
                                variant="outlined"
                                helperText={formik.touched.telefono && formik.errors.telefono ? formik.errors.telefono : ''}
                            />
                        </Grid>
                        <Grid size={{xs:12, md:6}}>
                            <MySwitch 
                                handleChange={formik.handleChange}
                                checked={formik.values.alumno as boolean}
                                sx={{m:0.5}}
                                name='alumno'
                                label='Marcar si es alumno/egresado de la UNAC'
                            />
                        </Grid>
                        <Grid size={{xs:12, md:6}}>
                            <MySelect 
                                disabled={!formik.values.alumno}
                                name="facultad"
                                label="Facultad"
                                sx={{m:0.5}}
                                value={formik.values.facultad}
                                handleChange={formik.handleChange}
                                helperText="Seleccionar facultad"
                                data={facultades}
                            />
                        </Grid>
                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                inputRef={codigoRef}
                                disabled={!formik.values.alumno}
                                fullWidth
                                error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                                name="codigo"
                                sx={{m:0.5}}
                                onBlur={formik.handleBlur}
                                label="Código de Alumno"
                                value={formik.values.codigo}
                                onChange={formik.handleChange}
                                helperText={formik.touched.codigo && formik.errors.codigo ? formik.errors.codigo : ''}
                            />
                        </Grid>
                </Grid>
                <ControlStepper activeStep={activeStep} handleBack={handleBack} steps={3}/>
            </Box>
        </React.Fragment>
    )
}
