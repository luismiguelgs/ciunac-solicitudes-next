import Grid from '@mui/material/Grid2'
import FormStart from './FormStart'
import Copyright from '@/components/Copyright'
import TableSimple, { IColumn } from "@/components/TableSimple";
import TypesService from '@/services/types.service';
import { ITipoSolicitud } from '@/interfaces/type.interface';

const columns: IColumn[] = [
    { id: 'label', label: 'Certificado', minWidth: 150 },
    { id: 'precio', label: 'Precio S/', minWidth: 120 },
];

const getCertificates = async () => {
    const res = await TypesService.fetchTipoCertificados()
    return res.filter(item=> item.value !== 'EXAMEN_DE_UBICACION')
}

interface Props {
    certificados: ITipoSolicitud[];
}

export default async function RequestCertifacatesPage() 
{
    const certificados = await getCertificates()

    return (
        <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
            <Grid size={{xs:12}}>
                <FormStart />
            </Grid>
            <Grid size={{xs:12, md:6}}>
                <Copyright />
            </Grid>
            <Grid size={{xs:12, md:6}}>
                {
                   certificados && <TableSimple columns={columns} rows={certificados} action={false} />
                }
            </Grid>
        </Grid>
    )
}
