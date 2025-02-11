'use client'
import IcronogramaExam from '@/interfaces/cronogramaExam.interface';
import React from 'react'
import MyTable from './(components)/MyTable';
import CronogramaExamService from '@/services/cronogramaExam.service';
import FormStart from './(components)/FormStart';
import { Alert, Box } from '@mui/material';
import { ITipoSolicitud } from '@/interfaces/type.interface';

export default function VerifySchedules({certificados}: {certificados:ITipoSolicitud[]}) 
{
    const [cronogramas, setCronogramas] = React.useState<IcronogramaExam[] | undefined>([])

    React.useEffect(() => {
        const fetchCronogramas = async () => {
            const data = await CronogramaExamService.getAll()
            setCronogramas(data);
        };
        fetchCronogramas();
    }, []);


    const verifySchedules = (cronogramas:IcronogramaExam[]) => {
        for (let i = 0; i < cronogramas.length; i++) {
            const schedule = cronogramas[i];
            const active = schedule.active
            if(active){
                return true
            }
        }
    }
    const schedulesLeft = (cronogramas:IcronogramaExam[]) => {
        const filerItem = cronogramas.filter(item => new Date(item.date) > new Date())
        return filerItem
    }
    return (
        <React.Fragment>
            {
                    verifySchedules(cronogramas as IcronogramaExam[])  ? 
                        <FormStart certificados={certificados} /> : (
                        <Box>
                            <Alert severity='info' sx={{mt:2, mb:2}}>
                                Lo sentimos, en estos momentos no hay cronogramas activos para el examen de ubicación, por favor intente para 
                                la siguiente fecha, la lista puede verla en el siguiente cuadro , o comuniquesé con nosotros a través de nuestro
                                correo electrónico: 
                                <strong>ciunac.matricula@unac.edu.pe</strong> o al teléfono: <strong>014291931</strong>
                            </Alert>
                            <MyTable cronogramas={schedulesLeft(cronogramas as IcronogramaExam[])} />
                        </Box>
                        )
                }
        </React.Fragment>
  )
}
