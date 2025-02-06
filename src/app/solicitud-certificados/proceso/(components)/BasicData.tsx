'use client'
import useFormStore from '@/stores/rcertificate.store';
import { useFormik } from 'formik';
import React from 'react';
import { initialValues, validationSchema } from '../(schemas)/basic.schema';
import { Alert, Box, Button, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useStore from '@/hooks/useStore';
import { useMask } from '@react-input/mask'
import { useTextsStore } from '@/stores/types.stores';
import SelectSubject from '@/components/SelectSubject';
import { MySelect, MySwitch } from '@/components/mui';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { NIVEL } from '@/libs/constants';
import SelectFaculty from '@/components/SelectFaculty';

export default function BasicData({onNext}:{onNext:() => void}) 
{
    const updateFormData = useFormStore((state) => state.updateFormData);
    const formData = useFormStore((state) => state.formData);
    const textos = useStore(useTextsStore, (state) => state.textos);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            updateFormData("basicData", values);
            onNext();
        },
        enableReinitialize: true
    });

    React.useEffect(() => {
        if(formData?.basicData) {
            formik.setValues(formData.basicData)
        }
    },[formData?.basicData, formik.setValues]);

    const apellidoRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const nombreRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const celularRef = useMask({ mask: '___-___-___', replacement: { _: /\d/ } });
    const codigoRef = useMask({ mask: '__________', replacement: { _: /^[a-zA-Z0-9_]*$/ } });

    return (
        <Box component='form' onSubmit={formik.handleSubmit} sx={{ p:0.5}} noValidate autoComplete='off'>
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
                    <SelectSubject
                            sx={{marginTop:0.5, marginLeft:0.5}}
                            helperText="Seleccionar el idioma"
                            value={formik.values.idioma}
                            handleChange={formik.handleChange}
                            error={formik.touched.idioma && Boolean(formik.errors.idioma)}
                        />
                        </Grid>
                        <Grid size={{xs:12, md:6}}>
                            <MySelect 
                                name="nivel"
                                label="Nivel"
                                sx={{m:0.5}}
                                value={formik.values.nivel}
                                error={formik.touched.nivel && Boolean(formik.errors.nivel)}
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
                                name='celular'
                                onBlur={formik.handleBlur}
                                error={formik.touched.celular && Boolean(formik.errors.celular)}
                                value={formik.values.celular}
                                onChange={formik.handleChange}
                                type='text'
                                label="Celular"
                                slotProps={{ input:{
                                    startAdornment: (<InputAdornment position="start"><WhatsAppIcon /></InputAdornment>),
                                }}}
                                variant="outlined"
                                helperText={formik.touched.celular && formik.errors.celular ? formik.errors.celular : ''}
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
                            <SelectFaculty 
                                disabled={!formik.values.alumno}
                                helperText="Seleccionar facultad"
                                value={formik.values.facultad}
                                handleChange={formik.handleChange}
                                error={formik.touched.facultad && Boolean(formik.errors.facultad)}
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
                        <Grid size={{xs:12}} display={'flex'} gap={2}>
                            <Button type="button" disabled={true} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Anterior</Button>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Siguiente</Button>
                        </Grid>
            </Grid>    
        </Box>
    )
}
