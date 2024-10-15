import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';
import useStore from '@/stores/student.store';
import { DocumentTypeMap, GenderTypeMap } from '@/libs/constants';
import { formatDateDDMMYYYY } from '@/libs/utils';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SwitchResaltado from '@/components/SwitchResaltado';
import IStudent from '@/interfaces/student.interface';
import { MyDialog } from '@/components/mui';
import { useRouter } from 'next/navigation';

type Props = {
    handleBack: () => void
    programs : any[]
}
type Condiciones = {
    data:boolean,
    aceptar:boolean
}
  
export default function Finish({handleBack, programs}:Props) 
{
    const router = useRouter()
    const { student } = useStore()
    const [condiciones, setCondiciones] = React.useState<Condiciones>({data:false, aceptar:false})
    const [loading, setLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>('Guardando información...')
    const [open, setOpen] = React.useState<boolean>(false)

    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    	setCondiciones({
      	...condiciones,
      	[event.target.name]: event.target.checked,
    	});
  	};

    const handleFinish = async (student:IStudent) => {
        setLoading(true)
        setOpen(true)
        const newStudent = await saveNewStudent(student)
        if(newStudent.data.code === "400"){
            setEmail(`${newStudent.data.message} DNI:${student.Numero_identificacion}`)
            setLoading(false)
        }else{
            setEmail('Enviando correo...');
            await sendEmail(student)
            setOpen(false)
            setLoading(false)
            setEmail('Guardando información...')
            router.push('./solicitud-nuevo/finalizar')
        }
    }

    return (
        <Box>
            <Alert sx={{mt:2, mb:2}} severity="info">
                <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px', fontSize:'1.1rem' }}>
                    Verifique bien los datos enviados, para evitar problemas, en el registro de datos.
                    Será enviado un correo de confirmación, de registro en el sistema, y con los accesos respectivos y manuales,
                    para los siguientes pasos a seguir.
                </Typography>
			</Alert>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Primer Apellido: <b>{student.Primer_apellido}</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Segundo Apellido: <b>{student.Segundo_apellido}</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Primer Nombre: <b>{student.Primer_nombre}</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Segundo Nombre: <b>{student.Segundo_nombre}</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Tipo de Documento: <b>{DocumentTypeMap[student.Codigo_tipo_identificacion] }</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Número de Documento: <b>{student.Numero_identificacion }</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Género: <b>{GenderTypeMap[student.Genero]}</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Fecha de Nacimiento: <b>{formatDateDDMMYYYY(new Date(student.Fecha_nacimiento))}</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Teléfono: <b>{student.Telefono}</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Email: <b>{student.Email}</b>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
                        Programa : <b>{programs.find((p:any) => p.Codigo === student.Codigo_programa).Nombre}</b>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} justifyContent='center'>
				<Grid size={{ xs: 12, sm: 6 }}>
					<SwitchResaltado
                        checked={condiciones.data}
                        mensaje='Marcar si los datos indicados lineas arriba son los correctos' 
                        label="Los datos proporcionados son los correctos"
                        name="data" 
                        handleChange={handleChangeSwitch}
                        fullWidth={true}/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6 }}>
					<SwitchResaltado
						checked={condiciones.aceptar}
						mensaje='Marcar si acepta todos los términos y condiciones líneas abajo' 
						label="Acepta todos los términos y condiciones"
						name="aceptar" 
						handleChange={handleChangeSwitch}
						fullWidth={true}/>
				</Grid>
			</Grid>
            <Box sx={{display:'flex',flexDirection:'column',pt:2, alignContent:'center', alignItems:'center'}}>
				<Box sx={{flex: '1 1 auto'}}>
					<Button disabled={loading} color='primary' onClick={handleBack} sx={{mr:1}} variant="outlined" startIcon={<ArrowBackIcon />}>
					    REGRESAR
					</Button>
					<Button 
						disabled={!(condiciones.data && condiciones.aceptar) || loading} color='primary' 
						onClick={()=>handleFinish(student)} 
						sx={{mr:1}} 
						variant="outlined"
						endIcon={<AssignmentTurnedInIcon />}>
							FINALIZAR
					</Button>
				</Box>	
			</Box>
            <Alert sx={{mt:2, mb:2}} severity="info">
                <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px', fontSize:'1.1rem' }}>
                    Si encuentra algún problema, y la información no es correcta, no llega el correo, o no tiene acceso a la cuenta, 
                    por favor contacte al administrador. <a href="mailto:ciunac.alumnosnuevos@unac.edu.pe" style={{ color: '#1976d2' }}>ciunac.alumnosnuevos@unac.edu.pe</a>
                </Typography>
			</Alert>
            
                <MyDialog 
                    open={open}
                    setOpen={setOpen}
                    title={'Espere, procesando información...'}
                    content={
                        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                            <CircularProgress size={60} />
                            <Typography variant='subtitle1' component={'p'} gutterBottom sx={{mt:2}}>
                                {email}
                            </Typography>
                            <img 
                                src={email ? "/send-email.png" : "/save-student.png"}  // URL de la imagen
                                alt="Cargando" 
                                style={{ width: '100px', height: '100px', marginTop: '16px' }} 
                            />
                        </Box>
                    }
                    type='FORM'
                />
            
        </Box>
    )
    
}

async function saveNewStudent(student:IStudent) {
    try{
        const response =  await fetch('/api/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(student)
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error('Failed to send student', await response.json());
        }
    }catch(error){
        console.error('An error occurred while sending the email:', error);
    }
}
async function sendEmail(student:IStudent) {
    try{
        const response =  await fetch('/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({ type: 'REGISTER', email: student.Email, user: student.Numero_identificacion })
        })
        if (response.ok) {
            console.log('Email registration sent successfully');
        } else {
            console.error('Failed to send registration email');
        }
    }catch(error){
        console.error('An error occurred while sending the email:', error);
    }
}