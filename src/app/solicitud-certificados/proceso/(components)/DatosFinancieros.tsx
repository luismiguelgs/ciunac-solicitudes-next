import { Alert, Box, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import ControlStepper from './ControlStepper';
import { useMask } from '@react-input/mask';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import uploadLogo from '../../../assets/upload.svg'
import { MySelect } from '@/components/mui';
import { IfinVal } from '@/interfaces/validation.interface';                                 
import Upload from './Upload';
import SolicitudesService from '@/services/solicitudes.service';
import { useRouter } from 'next/navigation';
import useStore from '@/hooks/useStore';
import { useDocumentsStore, useTextsStore } from '@/stores/types.stores';
import useStoreRequest from '@/stores/request.store';
import Grid from '@mui/material/Grid2';

type Props = {
    onSubmit : (values:any) => void
    handleBack : () => void
    activeStep: number,
}
let myData: any[] = []
const msgReq = 'Campo Requerido'

let validationSchema =  Yup.object<IfinVal>({
    pago: Yup.number().required(msgReq).min(0),
    numero_voucher: Yup.string().trim().when('pago',{
        is: 0,
        then:(schema:Yup.Schema) => schema.optional().nullable(),
        otherwise: (schema:Yup.Schema) => schema.required(msgReq),
    }),
    fecha_pago: Yup.date().when('pago',{
        is: 0,
        then:(schema:Yup.Schema) => schema.optional().nullable(),
        otherwise: (schema:Yup.Schema) => schema.required(msgReq),
    }),
    imagen: Yup.string().nullable()
})

export default function DatosFinancieros({onSubmit, handleBack, activeStep}:Props) 
{
    //hooks
    const [image, setImage] = React.useState<string>('')
    const [imageVal, setImageVal] = React.useState<boolean>(false)
    const certificados = useStore(useDocumentsStore, (state) => state.documents);
    const data = useStore(useStoreRequest, (state) => state.request);
    const textos = useStore(useTextsStore, (state) => state.textos);

    const voucherRef = useMask({ mask: '_______________', replacement: { _: /\d/ } });

    const router = useRouter()
    
    // Validar si hay registros anteior ****************************************************************************    
    React.useEffect(()=>{
        const fetchData = async() =>{
            const result = await SolicitudesService.fetchRecord(
                data?.idioma as string,
                data?.nivel as string,
                data?.dni as string,
                data?.tipo_solicitud as string
            )
                
            if(result.length > 0){
                console.log('existe registro anterior');
                router.push('./solicitud-certificados/cargo')
            }
        }
        fetchData()
    },[])
    

    const formik = useFormik<IfinVal>({
        initialValues: {
            numero_voucher: data?.numero_voucher || '' ,
            pago: Number(data?.pago),
            fecha_pago:  new Date(data?.fecha_pago as string),
            imagen: '',
        },
        validationSchema,
        onSubmit: (values, {resetForm}) => {
            values.imagen = image
            if(data?.trabajador && values.pago === 0){
                resetForm()
                onSubmit(values)
            }else{
                if(data?.voucher === uploadLogo){
                    setImageVal(true)
                }else{
                    onSubmit(values)
                }
            }
        },
    });

    if(data?.trabajador){
        const precio = certificados?.filter((cer)=> cer.value === data.tipo_solicitud)[0].precio
        myData = [
            {value:(Number(precio) - Number(precio)*0.8), label:`S/${(Number(precio) - Number(precio)*0.8).toFixed(2)} - presentar certificado de trabajo(docente)`},
            {value:(Number(precio)*0), label:`S/${(Number(precio)*0).toFixed(2)} - presentar certificado de trabajo(CAS)`},
        ]
    }else{
        const precio = certificados?.filter((cer)=> cer.value === data?.tipo_solicitud)[0].precio
        
        myData = [
            {value:precio, label:`S/${Number(precio).toFixed(2)} - precio normal`},
        ]
    }
    React.useEffect(() => {
        if (formik.values.pago === 0) {
            formik.setFieldValue('numero_voucher', '');
            formik.setFieldValue('fecha_pago', '');
        }
    }, [formik.values.pago]);

    return (
        <Box sx={{ flexGrow: 1, p:1 }} component='form' noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
                <Grid size={{xs:12, md:6}}>
                    <Alert severity="warning" sx={{mt:1}}>
                        {textos?.find(objeto=> objeto.titulo === 'texto_1_pago')?.texto}
                    </Alert>
                    {
                        imageVal ?
                        (
                            <Alert severity="error" sx={{mt:2}} variant='filled' icon={<CloudUploadIcon />}>
                                Completar la subida del archivo al servidor, solo se aceptan formatos *.jpg *.png *.pdf
                            </Alert>
                        ):(
                            <Alert severity="info" sx={{mt:2}} icon={<CloudUploadIcon />}>
                                Luego de buscar el archivo se subirá al servidor para su revisión 
                                se acepta formatos *.jpg *.png *.pdf 
                            </Alert>
                        )
                    }
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <MySelect 
                        sx={{mb:4, mt:1}}
                        handleChange={formik.handleChange}
                        name='pago'
                        error={formik.touched.pago && Boolean(formik.errors.pago)}
                        value={formik.values.pago}
                        label='Monto pagado'
                        helperText={formik.touched.pago && formik.errors.pago ? formik.errors.pago : ''}
                        data={myData}
                    />
                    <TextField
                        fullWidth
                        inputRef={voucherRef}
                        disabled={formik.values.pago === 0}
                        sx={{mb:4}}
                        required
                        error={formik.touched.numero_voucher && Boolean(formik.errors.numero_voucher)}
                        value={formik.values.numero_voucher}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="numero_voucher"
                        label="Número de Voucher"
                        helperText={ formik.touched.numero_voucher && formik.errors.numero_voucher ? formik.errors.numero_voucher : ''}
                    />
                    <TextField
                        type='date'
                        sx={{mb:4}}
                        required
                        fullWidth
                        disabled={formik.values.pago === 0}
                        error={formik.touched.fecha_pago && Boolean(formik.errors.fecha_pago)}
                        value={formik.values.fecha_pago}
                        onChange={formik.handleChange}
                        name="fecha_pago"
                        onBlur={formik.handleBlur}
                        slotProps={{inputLabel: {shrink: true}}}
                        label="Fecha de pago"
                        helperText={ (formik.touched.fecha_pago && formik.errors.fecha_pago) ? (formik.errors.fecha_pago as React.ReactNode) : '' }
                    />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <Upload 
                        imagen={data?.voucher as string}
                        data={data} 
                        setData={setImage}
                        ubicacion='vouchers' 
                        titulo='Subir voucher de pago' 
                        prop='img_voucher'/>
                </Grid>
            </Grid>
            <ControlStepper activeStep={activeStep} handleBack={handleBack} steps={3} />
        </Box>
    )
}
