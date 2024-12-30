'use client'
import { Button, Card, CardContent, CardHeader, CardMedia, LinearProgress } from '@mui/material'
import React from 'react'
import { VisuallyHiddenInput } from '@/libs/constants'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorageService from '@/services/storage.service';
import pdf from '@/assets/pdf.png'
import { getFileExtension } from '@/libs/utils';

type Props = {
    image: string
    data: any | undefined
    ubicacion: string,
    titulo: string,
    formik: any
    prop: string,
    activo?: boolean,
}

export default function Upload({image,data, formik, ubicacion, titulo, prop, activo=false}:Props) 
{
    const [extensiones, setExtensiones] = React.useState<Record<string, boolean>>()
    const [imagen, setImagen] = React.useState<string>(formik.getFieldProps(prop).value)
    const [progress, setProgress] = React.useState<number>(0)
    const [enviar, setEnviar] = React.useState<boolean>(false)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        
        if(file){
            upload(file)
        }   
    }

    React.useEffect(() => {
        console.log(image);
        if(!image) return
        const extension = getFileExtension(image)
        if(extension?.toUpperCase() === 'PDF'){
            setImagen(pdf.src)
        }
        else{
            setImagen(image)  
        }
    },[image])
    
    const upload = async(file:File) =>{
        let extension = file.name.split('.')
        let name = `${data?.dni}-${data?.idioma}-${data?.nivel}.${extension[1]}`
        extension[1]==='pdf' ? setExtensiones(prevState => ({...prevState, [prop]:true})) : setExtensiones(prevState => ({...prevState, [prop]:false}))
        setEnviar(true)
        const res = await StorageService.uploadDocument(
            name, //nombre del archivo
            file, //archivo binario
            setEnviar,
            setProgress, //barra de progreso
            ubicacion, //ubicacion (carpeta) del archivo /vouchers /trabajadores
        )
        formik.setFieldValue(prop, res)
        setImagen(res as string)
    }

    return (
        <Card sx={{ p:1 }}>
            <CardHeader title={titulo}/>
            <CardMedia
                component="img"
                alt="documento"
                src={extensiones && extensiones?.[prop] ? pdf.src : imagen}
                style={{width:'260px',margin: '0 auto', maxHeight:'260px'}}
            />
            <CardContent>
                <LinearProgress variant="determinate" value={progress} sx={{m:'1 auto'}} />
                <Button 
                    component="label"
                    sx={{mt: 1, width:'100%'}}
                    variant="contained"
                    disabled={enviar && !activo}
                    startIcon={<CloudUploadIcon />}>
                        Subir Archivo
                        <VisuallyHiddenInput type="file" accept='image/* , application/pdf,' onChange={e=> handleChange(e)}/>
                </Button>
            </CardContent>
        </Card>
    )
}