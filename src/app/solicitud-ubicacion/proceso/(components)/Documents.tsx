'use client'
import React from 'react'                   
import { Alert, Box, Button } from '@mui/material'
import Grid from '@mui/material/Grid2';                                                 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IdocumentVal } from '@/interfaces/validation.interface';
import Upload from '../../../../components/Upload';
import { useFormik } from 'formik';
import useStore from '@/hooks/useStore';
import { useTextsStore } from '@/stores/types.stores';
import useFormStore from '@/stores/solicitud.store';
import uploadLogo from '@/assets/upload.svg'

type Props = {
    onBack : () => void
    onNext : () => void
}

export default function Documents({onBack, onNext}:Props) 
{
	const formData = useFormStore((state) => state.formData);
    const textos = useStore(useTextsStore, (state) => state.textos);
    const [validation, setValidation] = React.useState<IdocumentVal>({cert_trabajador: false, cert_ciunac: false})
    const updateFormData = useFormStore((state) => state.updateFormData);

    const formik = useFormik({
        initialValues: {
            img_cert_trabajo: uploadLogo.src,
            img_cert_estudio: uploadLogo.src,
        },
        onSubmit: (values) => {
            if(formData.verifyData?.trabajador && values.img_cert_trabajo === uploadLogo.src) {
                setValidation((prevBasicVal)=>({...prevBasicVal, cert_trabajador:true}))    
            }
            else if(formData.verifyData?.alumno_ciunac && values.img_cert_estudio === uploadLogo.src) {
                setValidation((prevBasicVal)=>({...prevBasicVal, cert_ciunac:true}))
            }else{
                //alert(JSON.stringify(values, null, 2));
                updateFormData('documents', values);
                onNext()
            }
        }
    })

    const md = formData?.verifyData?.trabajador && formData?.verifyData?.alumno_ciunac ? 4 : 6

    return (
        <Box sx={{ flexGrow: 1, p:1 }} component='form' onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}> 
                <Grid size={{xs:12, md:md}} >
                    <Alert severity="warning">
                        {textos?.find(objeto=> objeto.titulo === 'texto_1_trabajador')?.texto}
                    </Alert>
                    <Alert severity="info" icon={<CloudUploadIcon />} sx={{mt:2}} variant='filled'>
                        Luego de buscar el archivo se subirá al servidor para su revisión 
                         se acepta formatos *.jpg *.png *.pdf
                    </Alert>
                    {
                        validation.cert_ciunac && (
                            <Alert severity="error" variant='filled' sx={{mt:1}} icon={<CloudUploadIcon />}>
                                Subir la imagen del certificado de estudios CIUNAC
                            </Alert>
                        )
                    }
                    {
                        validation.cert_trabajador && (
                            <Alert severity="error" variant='filled' sx={{mt:1}} icon={<CloudUploadIcon />}>
                                Subir la imagen del certificado de trabajador UNAC
                            </Alert>
                        )
                    }
                </Grid>
                {
                    formData.verifyData?.trabajador && (
                        <Grid size={{xs:12, md:md}}>
                            <Upload 
                                image={formData.documents?.img_cert_trabajo as string}
                                data={{
                                    dni:formData.verifyData?.dni,
                                    idioma: formData?.basicData?.idioma, 
                                    nivel: formData?.basicData?.nivel,
                                }} 
                                formik={formik}
                                ubicacion='trabajadores' 
                                prop='img_cert_trabajo' 
                                titulo='Subir Certificado de trabajor UNAC' />
                        </Grid>
                    )
                }
                {
                    formData.verifyData?.alumno_ciunac && (
                        <Grid size={{xs:12, md:md}}>
                            <Upload 
                                image={formData.documents?.img_cert_estudio as string}
                                data={{
                                    dni:formData.verifyData?.dni,
                                    idioma: formData?.basicData?.idioma, 
                                    nivel: formData?.basicData?.nivel,
                                }} 
                                formik={formik}
                                ubicacion='certificados' 
                                prop='img_cert_estudio' 
                                titulo='Subir Certificado de Estudio CIUNAC'/>
                        </Grid>
                    )
                }
            </Grid>
            <Grid size={{xs:12}} display={'flex'} gap={4}>
                <Button onClick={onBack} fullWidth variant="contained" color='secondary' sx={{ mt: 3, mb: 2 }}>Anterior</Button>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Siguiente</Button>
            </Grid>
        </Box>
	)
}
