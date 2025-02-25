import { Alert, Avatar, Box, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '@/components/Copyright';
import FormConsult from './FormCosult';

export default function RequestUbicacionPage() {
    return (
        <Grid container component={"main"} 
            sx={{ 
                height: "98vh", 
                width: "100%", 
                backgroundImage: "url(unsplash.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center", 
                overflow: 'hidden'
            }}>
            <Grid size={{xs:12, sm:8, md:5}} component={Paper} elevation={6} square 
                sx={{
                    margin: {xs: '0 auto', md: 0},
                    marginLeft: {md: '5%'},
                    marginTop: {md: '2%'},
                    marginBottom: {md: '2%'},
                    width: {xs: '90%', sm: '80%', md: 'auto'},                                        
                }}>
                    <Box sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Consulta de Solicitud
                        </Typography>
                        <Alert severity='info' sx={{mt:2, mb:2}} variant='filled'>
                            Ingresar su DNI, y verficar la ubicación que obtuvo y descargar la constancia
                            del examen.
                        </Alert>
                        {/** Form */}
                        <FormConsult />
                        <Copyright />
                    </Box>
            </Grid>    
        </Grid>
  )
}
