'use client'
import {Button} from '@mui/material';
import React from 'react'
import DownloadIcon from '@mui/icons-material/Download';
import { pdf } from '@react-pdf/renderer'
import { IexamenNotas } from '@/interfaces/examen.interface';
import ConstanciaFormat from './ConstanciaFormat';

type Props = {
    item: IexamenNotas
    fecha: string
}

export default function Download({item, fecha}:Props) 
{
    const descargarPDF = async() => {
        
        const cargoPdfElement = <ConstanciaFormat data={item} fecha={fecha}/>
        const blobPdf = await pdf(cargoPdfElement).toBlob()
        const blobUrl = URL.createObjectURL(blobPdf);
        // Crear un enlace (hipervínculo) invisible
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = blobUrl
        a.download = `${item.dni}-${item.idioma}-${item.nivel}.pdf`

        // Agregar el enlace al documento y hacer clic para iniciar la descarga
        document.body.appendChild(a);
        a.click();

        // Limpiar el enlace después de la descarga
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    }
    return (
        <Button 
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            fullWidth
            onClick={()=>descargarPDF()}>
                {`Descargar Constancia ${fecha}`}
        </Button>
    ) 
}
