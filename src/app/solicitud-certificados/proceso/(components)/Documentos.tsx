'use client'
import React from 'react'                   
import { Alert, Box } from '@mui/material'
import Grid from '@mui/material/Grid2';                                                 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IdocumentVal } from '@/interfaces/validation.interface';
import Upload from './Upload';
import ControlStepper from './ControlStepper';
import { useFormik } from 'formik';
import { validationDocuments } from '@/services/validation.service';
import useStore from '@/hooks/useStore';
import useStoreRequest from '@/stores/request.store';
import { useTextsStore } from '@/stores/types.stores';
import Isolicitud from '@/interfaces/solicitud.interface';

type Props = {
    validation: IdocumentVal,
    onSubmit : (values?:any) => void
    activeStep: number,
    setValidation : React.Dispatch<React.SetStateAction<IdocumentVal>>
    handleBack : () => void
}

export default function Documentos({validation,setValidation ,activeStep, handleBack, onSubmit}:Props) 
{
    const data = useStore(useStoreRequest, (state) => state.request);
    const textos = useStore(useTextsStore, (state) => state.textos);
    const { setRequest } = useStoreRequest();
    const [imageCertTrabajo, setImageCertTrabajo] = React.useState<string>('');
    const [imageCertEstudio, setImageCertEstudio] = React.useState<string>('');

    //const {data, setData, textos} = useStateContext()
    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {
            if (validationDocuments(data as Isolicitud, setValidation)) {
                setRequest('certificado_trabajo',imageCertTrabajo)
                setRequest('img_cert_estudio',imageCertEstudio)
                onSubmit()
            }
        }
    })

    const md = data?.trabajador && data.alumno_ciunac ? 4 : 6

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
                    data?.trabajador && (
                        <Grid size={{xs:12, md:md}}>
                            <Upload 
                                imagen={data.img_cert_trabajo as string}
                                data={data} 
                                setData={setImageCertTrabajo} 
                                ubicacion='trabajadores' 
                                prop='img_cert_trabajo' 
                                titulo='Subir Certificado de trabajor UNAC' />
                        </Grid>
                    )
                }
                {
                    data?.alumno_ciunac && (
                        <Grid size={{xs:12, md:md}}>
                            <Upload 
                                imagen={data.img_cert_estudio as string}
                                data={data} 
                                setData={setImageCertEstudio} 
                                ubicacion='certificados' 
                                prop='img_cert_estudio' 
                                titulo='Subir Certificado de Estudio CIUNAC'/>
                        </Grid>
                    )
                }
            </Grid>
            <ControlStepper activeStep={activeStep} handleBack={handleBack} steps={3}/>
        </Box>
    )
}
