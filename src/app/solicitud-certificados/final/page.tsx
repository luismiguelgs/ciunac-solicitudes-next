'use client'
import { Alert, Box, Button } from "@mui/material";
import Image from "next/image";
import pdfImage from "@/assets/pdf.png";
import Disclamer from "./Disclamer";
import CargoPdf from "./CargoPdf";
import { pdf } from '@react-pdf/renderer'
import useStore from "@/hooks/useStore";
import { useTextsStore } from "@/stores/types.stores";
import { Itexto } from "@/interfaces/type.interface";
import React from "react";
import { useSearchParams } from "next/navigation";
import SolicitudesService from "@/services/solicitudes.service";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function FinishPage() 
{
    const searchParams = useSearchParams()
    const id =  searchParams.get('id')
    const textos = useStore(useTextsStore, (state) => state.textos)
    const [data, setData] = React.useState<any>({})

    React.useEffect(() => {
        const getData = async (_id:string) => {
            console.log(_id);
            const result = await SolicitudesService.getItemId(_id)
            console.log(result);
            setData(result)
        }
        getData(id as string)
    }, [])

    const exportPDF = async() => {
        const cargoPdfElement = <CargoPdf textos={textos as Itexto[]} obj={data}/>
        const blobPdf = await pdf(cargoPdfElement).toBlob()

        const blobUrl = URL.createObjectURL(blobPdf);

        // Crear un enlace (hipervínculo) invisible
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = blobUrl
        a.download = `${data.dni}-${data.idioma}-${data.nivel}.pdf`

        // Agregar el enlace al documento y hacer clic para iniciar la descarga
        document.body.appendChild(a);
        a.click();

        // Limpiar el enlace después de la descarga
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    }

    return (
        <Box m={2}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                <Alert sx={{mt:2, mb:2}}  severity='error'>
					Se ha completado el procedimiento puede descargar su cargo! para presentarlo de manera física, para recoger su certificado
				</Alert>
                <Box display={'flex'} alignItems={'center'} gap={10}>
                    <Image src={pdfImage} alt="pdf" width={50} height={50} onClick={exportPDF} />
                    <Button color="success" variant="contained" onClick={exportPDF} autoFocus disabled={false} endIcon={<CloudDownloadIcon />} >
						Descargar Cargo
					</Button>
                </Box>
                <Disclamer textoFinal={true} />
            </Box>
        </Box>
    )
}
