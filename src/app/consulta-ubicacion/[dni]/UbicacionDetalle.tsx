'use client'
import React from 'react'
import Grid from '@mui/material/Grid2';
import { Typography,  ListItem, ListItemText, Divider, Skeleton } from '@mui/material';
import { Iexamen, IexamenNotas } from '@/interfaces/examen.interface';
import SolicitudesExamenService from '@/services/solicitud-examen.service';
import Download from './Download';

export default function UbicacionDetalle({dni}:{dni:string}) 
{
    // Lógica para obtener las notas del alumno
    const [notas, setNotas] = React.useState<IexamenNotas[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [examenes, setExamenes] = React.useState<Iexamen[]>([]);

    React.useEffect(() => {
        const fetchNotas = async () => {
            setLoading(true);
            try {
                const rNotas = await SolicitudesExamenService.fetchItemsDetail(dni);
                const rExamenes = await SolicitudesExamenService.fetchItems()
                setNotas(rNotas);
                setExamenes(rExamenes);
            } catch (error) {
                console.error('Error al obtener las notas:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchNotas();
    }, [dni]);

    if (loading) {
        return (
            <Loading />
        );
    }

    // Si no hay notas, muestra un mensaje
    if (notas.length === 0) {
        return (
        <Typography variant="body1" sx={{ textAlign: 'center', p: 3 }}>
            No se encontraron notas para este alumno.
        </Typography>
        );
    }

    return (
        <>
            {notas.map((nota) => (
            <React.Fragment key={nota.id}>
                <ListItem>
                    <Grid container spacing={2} width={'100%'}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <ListItemText
                                primary={nota.idioma}
                                secondary={`Fecha: ${examenes.find((examen) => examen.id === nota.examen_id)?.fecha_examen.toLocaleDateString()}`}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="body1">
                                    Nota: <strong>{nota.nota}/100</strong>
                                </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="body1">
                            Ubicación: <strong>{nota.ubicacion}</strong>
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Download item={nota} fecha={examenes.find((examen) => examen.id === nota.examen_id)?.fecha_examen.toLocaleDateString()} />
                        </Grid>
                    </Grid>
                </ListItem>
                <Divider component="li" />
            </React.Fragment>
          ))}
        </>
    )
}

function Loading() {
    return (
        <>
        {Array.from({ length: 2 }).map((_, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Grid container spacing={2} width={'100%'}>
                {/* Skeleton para el idioma y la fecha */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Skeleton variant="text" width="60%" height={40} />
                  <Skeleton variant="text" width="40%" height={20} />
                </Grid>
                {/* Skeleton para la nota */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Skeleton variant="text" width="50%" height={40} />
                </Grid>
                {/* Skeleton para la ubicación */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Skeleton variant="text" width="50%" height={40} />
                </Grid>
                {/* Skeleton para el botón de descarga */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Skeleton variant="rectangular" width="100%" height={40} />
                </Grid>
              </Grid>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </>
    )
}