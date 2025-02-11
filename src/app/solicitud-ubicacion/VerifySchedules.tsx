'use client';
import IcronogramaExam from '@/interfaces/cronogramaExam.interface';
import React from 'react';
import MyTable from './(components)/MyTable';
import CronogramaExamService from '@/services/cronogramaExam.service';
import FormStart from './(components)/FormStart';
import { Alert, Box, Skeleton } from '@mui/material';
import { ITipoSolicitud } from '@/interfaces/type.interface';
import Grid from '@mui/material/Grid2';

export default function VerifySchedules({ certificados }: { certificados: ITipoSolicitud[] }) {
  const [cronogramas, setCronogramas] = React.useState<IcronogramaExam[] | undefined>([]);
  const [loading, setLoading] = React.useState(true); // Estado para manejar la carga

  React.useEffect(() => {
    const fetchCronogramas = async () => {
      try {
        const data = await CronogramaExamService.getAll();
        setCronogramas(data);
      } catch (error) {
        console.error('Error fetching cronogramas:', error);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };
    fetchCronogramas();
  }, []);

  const verifySchedules = (cronogramas: IcronogramaExam[]) => {
    for (let i = 0; i < cronogramas.length; i++) {
      const schedule = cronogramas[i];
      const active = schedule.active;
      if (active) {
        return true;
      }
    }
    return false; // Retornar false si no hay cronogramas activos
  };

  const schedulesLeft = (cronogramas: IcronogramaExam[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00.000

    // Obtener la fecha de "pasado mañana" (día después de mañana) sin la hora
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2); // Añade dos días a la fecha actual

    // Filtrar los elementos cuya fecha sea posterior a "pasado mañana"
    const filerItem = cronogramas.filter((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0); // Eliminar la hora de la fecha del ítem
      return itemDate > dayAfterTomorrow; // Solo fechas posteriores a "pasado mañana"
    });

    return filerItem;
  };

  return (
    <React.Fragment>
      {loading ? (
        // Mostrar Skeleton mientras se carga
        <Loading />
      ) : verifySchedules(cronogramas as IcronogramaExam[]) ? (
        // Mostrar FormStart si hay cronogramas activos
        <FormStart certificados={certificados} />
      ) : (
        // Mostrar mensaje y tabla si no hay cronogramas activos
        <Box>
          <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
            Lo sentimos, en estos momentos no hay cronogramas activos para el examen de ubicación, por favor intente para
            la siguiente fecha, la lista puede verla en el siguiente cuadro, o comuníquese con nosotros a través de nuestro
            correo electrónico: <strong>ciunac.matricula@unac.edu.pe</strong> o al teléfono: <strong>014291931</strong>
          </Alert>
          <MyTable cronogramas={schedulesLeft(cronogramas as IcronogramaExam[])} />
        </Box>
      )}
    </React.Fragment>
  );
}

function Loading() {
    return (
        <Box sx={{ width: '100%', p:2 }}>
            <Grid container spacing={2}>
            {/* Dos rectángulos que ocupan la mitad de la pantalla */}
            <Grid size={{xs:12, md:6}}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Grid>
            {/* Dos rectángulos más abajo */}
            <Grid size={{xs:12, md:6}}>
              <Skeleton variant="rectangular" width="100%" height={150} />
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <Skeleton variant="rectangular" width="100%" height={150} />
            </Grid>
          </Grid>
        </Box>
    )
}