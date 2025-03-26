import useStore from '@/hooks/useStore';
import useFormStore from '@/stores/solicitud.store';
import {  useTextsStore } from '@/stores/types.stores';
import { useFormik } from 'formik';
import React from 'react';
import { initialValues, validationSchema } from './schemas/fin.schema';
import Grid from '@mui/material/Grid2';
import { Alert, Box, Button, TextField } from '@mui/material';
import { MySelect } from '@/components/mui';
import { useMask } from '@react-input/mask';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Upload from '@/components/Upload';
import uploadLogo from '@/assets/upload.svg'

type Props = {
    onNext: () => void;
    onBack: () => void;
    trabajador: boolean;
    precio: number;
}

export default function FinData({onNext, onBack, trabajador, precio}:Props) 
{
    const textos = useStore(useTextsStore, (state) => state.textos);
    const [myData, setMyData] = React.useState<{value:string, label:string}[]>([]);
    const updateFormData = useFormStore((state) => state.updateFormData);
    const formData = useFormStore((state) => state.formData);

    const [imageVal, setImageVal] = React.useState<boolean>(false)

    const voucherRef = useMask({ mask: '_______________', replacement: { _: /\d/ } });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if(values.img_voucher === uploadLogo.src){
                if(values.pago !== '0'){
                    setImageVal(true)
                }else{
                    updateFormData("finData", values);
                    onNext();
                }
            }else{
                updateFormData("finData", values);
                onNext();
            }
        },
        enableReinitialize: true
    });    
    
    React.useEffect(() => {
        if(trabajador){
            const options = [
                {value:String(Number(precio) - Number(precio)*0.8), label:`S/${(Number(precio) - Number(precio)*0.8).toFixed(2)} - presentar certificado de trabajo(docente)`},
                {value:String(Number(precio)*0), label:`S/${(Number(precio)*0).toFixed(2)} - presentar certificado de trabajo(CAS)`},
            ]
            setMyData(options);
        }else{
            const options = [
                {value:String(precio), label:`S/${Number(precio).toFixed(2)} - precio normal`}
            ]
            setMyData(options);
            formik.setFieldValue('pago', options[0].value);
        }
        
    }, [trabajador]);

    React.useEffect(() => {
        if(formData?.finData){
            formik.setValues({...formData.finData,pago:String(formData.finData.pago)});
        }
    }, []);
    

    return (
        <Box sx={{ flexGrow: 1, p:1 }} component='form' noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
                <Grid size={{xs:12, md:4}}>
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
                <Grid size={{xs:12, md:4}}>
                    {myData && <MySelect 
                        sx={{mb:4, mt:1}}
                        handleChange={formik.handleChange}
                        name='pago'
                        error={formik.touched.pago && Boolean(formik.errors.pago)}
                        value={formik.values.pago}
                        label='Monto pagado'
                        helperText={formik.touched.pago && formik.errors.pago ? formik.errors.pago : ''}
                        data={myData}
                    />
                    }
                    <TextField
                        fullWidth
                        inputRef={voucherRef}
                        disabled={formik.values.pago === '0'}
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
                        disabled={formik.values.pago === '0'}
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
                <Grid size={{xs:12, md:4}}>
                    <Upload 
                        image={formData?.finData?.img_voucher as string}
                        data={{
                            dni:formData.verifyData?.dni,
                            idioma: formData?.basicData?.idioma, 
                            nivel: formData?.basicData?.nivel,
                        }} 
                        formik={formik}
                        ubicacion='vouchers' 
                        titulo='Subir voucher de pago' 
                        prop='img_voucher'/>
                </Grid>
                
            </Grid>
            <Grid size={{xs:12}} display={'flex'} gap={4}>
                <Button onClick={onBack} fullWidth variant="contained" color='secondary' sx={{ mt: 3, mb: 2 }}>Anterior</Button>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Siguiente</Button>
            </Grid>
        </Box>
    )
}