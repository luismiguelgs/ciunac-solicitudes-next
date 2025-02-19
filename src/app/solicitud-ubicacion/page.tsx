import Grid from '@mui/material/Grid2'
import Copyright from '@/components/Copyright'
import TypesService from '@/services/types.service';
import VerifySchedules from './(components)/VerifySchedules';

const getCertificates = async () => {
    const res = await TypesService.fetchTipoCertificados()
    return res
}

export default async function page() 
{
    const certificados = await getCertificates()
    //const cronogramas = await getSchedules()

    return (
        <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
            <Grid size={{xs:12}}>
                <VerifySchedules certificados={certificados} />
            </Grid>
            <Grid size={{xs:12, md:6}}>
                <Copyright />
            </Grid>
        </Grid>
    )
}
