'use client'
import React from 'react'
import Grid from '@mui/material/Grid2';
import { Alert, Box, Button, InputAdornment, TextField } from '@mui/material';
import { initialValues, validationSchema } from '../(schemas)/basic.schema';
import useFormStore from '@/stores/solicitud.store';
import { useStore } from 'zustand';
import { useTextsStore } from '@/stores/types.stores';
import { useFormik } from 'formik';
import { useMask } from '@react-input/mask';
import SelectSubject from '@/components/SelectSubject';
import { MySelect, MySwitch } from '@/components/mui';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { NIVEL } from '@/libs/constants';
import SelectFaculty from '@/components/SelectFaculty';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Upload from '@/components/Upload';
import uploadLogo from '@/assets/upload.svg'

export default function BasicData({onNext}:{onNext:() => void}) 
{
    const [imageVal, setImageVal] = React.useState<boolean>(false)
    const updateFormData = useFormStore((state) => state.updateFormData);
    const formData = useFormStore((state) => state.formData);
    const textos = useStore(useTextsStore, (state) => state.textos);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if(values.img_dni === uploadLogo.src){
                setImageVal(true)
            }else{
                setImageVal(false)
                updateFormData("basicData", values);
                onNext();
            }
        },
        enableReinitialize: true
    });

    React.useEffect(() => {
        if(formData?.basicData) {
            formik.setValues({
                ...formData.basicData,
                img_dni: formData.basicData?.img_dni || uploadLogo.src,
                telefono: formData.basicData?.telefono || ''
            })
        }
    },[formData?.basicData, formik.setValues]);

    const apellidoRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const nombreRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const celularRef = useMask({ mask: '___-___-___', replacement: { _: /\d/ } });
    const codigoRef = useMask({ mask: '__________', replacement: { _: /^[a-zA-Z0-9_]*$/ } });

    return (
        <Box component='form' onSubmit={formik.handleSubmit} sx={{p:1}} noValidate autoComplete='off'>
            <Grid container spacing={2}>
                <Grid container spacing={1} size={{xs:12, md:8}}>
                    <Grid size={{xs:12}}>
                        <Alert severity="warning">
                            {textos?.find(objeto=> objeto.titulo === 'texto_ubicacion_2')?.texto}
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
                            helperText={formik.touched.apellidos && formik.errors.apellidos ? formik.errors.apellidos : ''}
                        />
                    </Grid>
                    <Grid size={{xs:12, md:6}}>
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
                            helperText={formik.touched.nombres && formik.errors.nombres ? formik.errors.nombres : ''}
                        />
                    </Grid>
                    <Grid size={{xs:12, md:6}}>
                        <SelectSubject 
                            handleChange={formik.handleChange}
                            value={formik.values.idioma}
                            ubication={true}
                            error={formik.touched.idioma && Boolean(formik.errors.idioma)}
                            helperText={formik.touched.idioma && formik.errors.idioma ? formik.errors.idioma : ''}
                        />
                    </Grid>
                    <Grid size={{xs:12, md:6}}>
                        <MySelect 
                            name="nivel"
                            label="Nivel"
                            sx={{mt:1}}
                            disabled={!formData?.verifyData?.alumno_ciunac}
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
                            name='alumno'
                            label='Marcar si es alumno/egresado de la UNAC'
                        />
                    </Grid>
                    <Grid size={{xs:12, md:6}}>
                        <SelectFaculty 
                            disabled={!formik.values.alumno}
                            value={formik.values.facultad}
                            margin={true}
                            handleChange={formik.handleChange}
                            error={formik.touched.facultad && Boolean(formik.errors.facultad)}
                            helperText={formik.touched.facultad && formik.errors.facultad ? formik.errors.facultad : ''}
                        />
                    </Grid>
                    <Grid size={{xs:12, md:6}}>
                        <TextField
                            inputRef={codigoRef}
                            required
                            fullWidth
                            disabled={!formik.values.alumno}
                            name='codigo'
                            sx={{mt:1}}
                            onBlur={formik.handleBlur}
                            error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                            value={formik.values.codigo}
                            onChange={formik.handleChange}
                            type='text'
                            label="Código de alumno"
                            helperText={formik.touched.codigo && formik.errors.codigo ? formik.errors.codigo : ''}
                        />
                    </Grid>
                    <Grid size={{xs:12}}>
                        {
                            imageVal ? 
                            (<Alert icon={<CloudUploadIcon />} severity="error" variant='filled'>
                                Subir la imagen del DNI, solo se aceptan formatos *.jpg *.png *.pdf
                            </Alert>) :
                            (<Alert icon={<CloudUploadIcon />} severity="info" variant='filled'>
                                Luego de buscar el archivo se subirá al servidor para su revisión 
                                se acepta formatos *.jpg *.png *.pdf
                            </Alert>)
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={1} size={{xs:12, md:4}}>
                    <Grid size={{xs:12}}>
                        <Upload 
                            image={formData?.basicData?.img_dni as string}
                            data={{
                                dni:formData.verifyData?.dni,
                                idioma: formData?.basicData?.idioma, 
                                nivel: formData?.basicData?.nivel,
                            }} 
                            formik={formik}
                            ubicacion='dnis' 
                            titulo='Subir imagen DNI' 
                            prop='img_dni'/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={{xs:12}} display={'flex'} gap={4}>
                <Button onClick={()=>{}} disabled fullWidth variant="contained" color='secondary' sx={{ mt: 3, mb: 2 }}>Anterior</Button>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Siguiente</Button>
            </Grid>
        </Box>
    )
}
