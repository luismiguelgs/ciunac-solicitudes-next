import Grid from '@mui/material/Grid2'
import Copyright from '@/components/Copyright'
import FormStart from './FormStart'
import TypesService from '@/services/types.service';
import CronogramaExamService from '@/services/cronogramaExam.service';
import { Alert, Box } from '@mui/material';
import IcronogramaExam from '@/interfaces/cronogramaExam.interface';
import MyTable from './MyTable';

const getCertificates = async () => {
    const res = await TypesService.fetchTipoCertificados()
    return res
}
const getSchedules = async () => {
    const res = await CronogramaExamService.getAll()
    return res
}


export default async function page() 
{
    const certificados = await getCertificates()
    const cronogramas = await getSchedules()

    let index:number = 0

    const verifySchedules = (cronogramas:IcronogramaExam[]) => {
        for (let i = 0; i < cronogramas.length; i++) {
            const schedule = cronogramas[i];
            const active = schedule.active
            if(active){
                index = i
                return true
            }
        }
    }
    const schedulesLeft = (cronogramas:IcronogramaExam[]) => {
        const filerItem = cronogramas.filter(item => new Date(item.date) > new Date())
        return filerItem
    }

    return (
        <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
            <Grid size={{xs:12}}>
                {
                    verifySchedules(cronogramas as IcronogramaExam[]) ? 
                        <FormStart certificados={certificados} /> : 
                        <Box>
                            <Alert severity='info'>
                                Lo sentimos, en estos momentos no hay cronogramas activos para el examen de ubicación, por favor intente para 
                                la siguiente fecha, la lista puede verla en el siguiente cuadro , o comuniquesé con nosotros a través de nuestro
                                correo electrónico: 
                                <strong>ciunac.matricula@unac.edu.pe</strong> o al teléfono: <strong>014291931</strong>
                            </Alert>
                            <MyTable cronogramas={schedulesLeft(cronogramas as IcronogramaExam[])} />
                        </Box>
                }
            </Grid>
            <Grid size={{xs:12, md:6}}>
                <Copyright />
            </Grid>
        </Grid>
    )
}
