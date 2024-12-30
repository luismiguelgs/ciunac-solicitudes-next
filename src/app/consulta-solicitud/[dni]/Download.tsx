'use client'
import WestIcon from '@mui/icons-material/West';
import {Button, Box, Typography} from '@mui/material';
import React from 'react'
import pdfImage from '@/assets/pdf.png'
import Isolicitud from '@/interfaces/solicitud.interface';
import CargoPdf from '@/components/pdf/CargoPdf'
import { pdf } from '@react-pdf/renderer'
import { Itexto } from '@/interfaces/type.interface';

type Props = {
    item: Isolicitud
    textos: Itexto[]
}

export default function Download({item, textos}:Props) 
{
    const descargarPDF = async(item:Isolicitud) => {
        const obj =  {
            solicitud: item.tipo_solicitud,
            creado: (item.creado as unknown as Date).toLocaleDateString(),
            apellidos:item.apellidos,
            nombres:item.nombres,
            dni:item.dni,
            idioma:item.idioma,
            nivel:item.nivel,
            pago: item.pago,
            voucher: item.numero_voucher
        }
        console.log(obj);
        
        const cargoPdfElement = <CargoPdf textos={textos} obj={obj}/>
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
        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt:2}}>
            <img src={pdfImage.src} alt={item.id}  width='50px' style={{margin:'5px', cursor:'pointer'}} onClick={()=>descargarPDF(item)} ></img>
            <Button size="large" onClick={()=>descargarPDF(item)}>{`${item.dni}-${item.idioma}-${item.nivel}.PDF`}</Button>
            <WestIcon color='error' />
            <Typography variant="h6" color="error">
                Puede descargar su cargo aqui!
            </Typography>
        </Box>
    )
}
