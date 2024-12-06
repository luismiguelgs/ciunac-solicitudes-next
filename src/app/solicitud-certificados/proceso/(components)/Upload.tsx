import { Button, Card, CardContent, CardHeader, CardMedia, LinearProgress } from '@mui/material'
import React from 'react'
import { VisuallyHiddenInput } from '../../core/libs/constants'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ISolicitud from '../../core/interfaces/ISolicitud';
import StorageService from '../services/StorageService';
import { useStateContext } from '../../core/contexts/ContextProvider';
import pdf from '../../assets/pdf.png'

type Props = {
    data: ISolicitud
    setData : React.Dispatch<React.SetStateAction<ISolicitud>>,
    ubicacion: string,
    titulo: string,
    prop: string,
    activo?: boolean,
    imagen: string
}

export default function Upload({data, setData, imagen, ubicacion, titulo, prop, activo=false}:Props) 
{
    const {extensiones, setExtensiones} = useStateContext()
    const [progress, setProgress] = React.useState<number>(0)
    const [enviar, setEnviar] = React.useState<boolean>(false)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        
        if(file){
            upload(file)
        }   
    }
    
    const upload = (file:File):void =>{
        let extension = file.name.split('.')
        let name = `${data.dni}-${data.idioma}-${data.nivel}.${extension[1]}`
        extension[1]==='pdf' ? setExtensiones(prevState => ({...prevState, [prop]:true})) : setExtensiones(prevState => ({...prevState, [prop]:false}))
        setEnviar(true)
        StorageService.uploadDocument(
            name,
            file,
            setEnviar,
            setProgress,
            setData,
            ubicacion,
            prop
        )
    }

    return (
        <Card sx={{ p:1 }}>
            <CardHeader title={titulo}/>
            <CardMedia
                component="img"
                alt="documento"
                image={extensiones[prop] ? pdf : imagen}
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
