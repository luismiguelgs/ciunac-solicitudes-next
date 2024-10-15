import { Alert, Box, Typography } from '@mui/material'
import React from 'react'

export default function FinishPage() {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} sx={{width:'100%', height:'100%'}}>
        <Typography variant="h3">Proceso Finalizado</Typography>
        <Box m={2} display={'flex'} alignItems={'center'}>
            <img src="/save-student.png" alt="ok" width="100px"/>   
            <Typography variant="h5" ml={2}>Estudiante guardado exitosamente!</Typography>
        </Box>
        <Box m={2} display={'flex'} alignItems={'center'} >
            <img src="/send-email.png" alt="ok" width="100px"/>   
            <Typography variant="h5" ml={2}>Correo enviado exitosamente!</Typography>
        </Box>
		<Alert sx={{mt:2, mb:2}} severity='info' variant='filled'>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px', fontSize:'1.1rem' }}>
                El proceso realizado es de para registrar un alumno el la plataforma de CIUNAC, no significa un proceso de matrícula, para el proceso de 
				prematrícula, y matrícula verificar los manuales enviados a su correo. MUCHAS GRACIAS!!!!
            </Typography>
		</Alert>
        <Alert sx={{mt:2, mb:2}} severity="error" variant='filled'>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px', fontSize:'1.1rem' }}>
                Puede revisar su correo electrónico para tener los accesos al sistema.
                Si no llega los accesos, por favor contacte al administrador. <a href="mailto:ciunac.alumnosnuevos@unac.edu.pe" style={{ color: 'white' }}>ciunac.alumnosnuevos@unac.edu.pe</a>
            </Typography>
		</Alert>
		
    </Box>
  )
}
