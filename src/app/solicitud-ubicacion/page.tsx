import Grid from '@mui/material/Grid2'
import Copyright from '@/components/Copyright'
import FormStart from './FormStart'
import TypesService from '@/services/types.service';

const getCertificates = async () => {
    const res = await TypesService.fetchTipoCertificados()
    return res
}

export default async function page() 
{
    const certificados = await getCertificates()
    return (
        <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
            <Grid size={{xs:12}}>
                <FormStart certificados={certificados} />
            </Grid>
            <Grid size={{xs:12, md:6}}>
                <Copyright />
            </Grid>
        </Grid>
    )
}
