import React from 'react';
import { Box, Typography, List,  Paper, Avatar } from '@mui/material';
import UbicacionDetalle from './UbicacionDetalle';
import Copyright from '@/components/Copyright';
import Grid from '@mui/material/Grid2';
import PersonIcon from '@mui/icons-material/Person'; // Ícono de usuario

export default function UbicationDetailPage({ params, searchParams }: { params: { dni: string } , searchParams: {nombres:string, apellidos:string} }) 
{

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Detalle de Ubicación y Notas
            </Typography>

            {/* Ubicación del alumno */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 1 }} alignItems={'center'} justifyContent={'center'}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                        <PersonIcon fontSize="large" />
                    </Avatar>
                    </Grid>
                    <Grid size={{ xs: 12, md: 11 }}>
                        <Typography variant="h5" gutterBottom>
                            Datos del Alumno
                        </Typography>
                        <Typography variant="body1">
                            <strong>Nombre del Alumno: </strong> 
                            {`${searchParams.nombres.toLocaleUpperCase().trim()} ${searchParams.apellidos.toLocaleUpperCase().trim()}`}
                        </Typography>
                        <Typography variant="body1">
                            <strong>DNI: </strong>{params.dni}
                        </Typography>
                    </Grid>
                </Grid>
                
            </Paper>

            {/* Lista de notas */}
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                Notas del Alumno
                </Typography>
                <List>
                    <UbicacionDetalle dni={params.dni}/>
                </List>
            </Paper>
            <Box sx={{ margin: 'auto' }}>
                <Copyright />
            </Box>
        </Box>
    );
}