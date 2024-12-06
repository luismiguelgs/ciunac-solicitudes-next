'use client'
import React from 'react'
import Grid from '@mui/material/Grid2';
import { Alert, Box, Button, Link } from '@mui/material'
import { MyDialog } from '@/components/mui'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DataDisplay from './DataDisplay'
import SwitchResaltado from '@/components/SwitchResaltado'
import Disclamer from './Disclamer'
import SolicitudesService from '@/services/solicitudes.service'
import ISolicitud from '@/interfaces/solicitud.interface'
import { Irow } from '@/interfaces/type.interface'
import useStore from '@/hooks/useStore';
import { useTextsStore } from '@/stores/types.stores';
import { useRouter } from 'next/navigation';

type Props = {
    data:ISolicitud
    handleBack : () => void,
	constancia:string,
	data2010:Irow[],
}
type Condiciones = {
    condi:boolean,
    aceptar:boolean
  }
  
export default function Final({data, handleBack, constancia, data2010 }:Props) 
{
	const textos = useStore(useTextsStore, (state) => state.textos)

	const router = useRouter()
    const [condiciones, setCondiciones] = React.useState<Condiciones>({condi:false, aceptar:false})

    const [open, setOpen] = React.useState<boolean>(false)

    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    	setCondiciones({
      	...condiciones,
      	[event.target.name]: event.target.checked,
    	});
  	};
    const handleFinish = () =>{
    	//guardar nuevo registro
    	SolicitudesService.newItem(data, constancia, data2010)
    	//Ir a la pagina final
		router.push('./solicitud-certificados/final')
    	setOpen(false)
  	}

    return (
        <Box sx={{m:2, display:'flex', flexDirection:'column'}}>
            <Alert sx={{mt:2, mb:2}} severity="info">
				{textos?.find(objeto=> objeto.titulo === 'texto_ubicacion_3')?.texto}
                <Link href="https://ciunac.unac.edu.pe/">ciunac.unac.edu.pe</Link>
			</Alert>
            <DataDisplay data={data} />
            <Grid container spacing={1} justifyContent='center'>
				<Grid size={{xs:6}}>
					<SwitchResaltado
					checked={condiciones.condi}
					mensaje='Marcar si los datos indicados lineas arriba son los correctos' 
					label="Los datos proporcionados son los correctos"
					name="data" 
					handleChange={handleChangeSwitch}
					fullWidth={true}/>
				</Grid>
				<Grid size={{xs:6}}>
					<SwitchResaltado
						checked={condiciones.aceptar}
						mensaje='Marcar si acepta todos los términos y condiciones líneas abajo' 
						label="Acepta todos los términos y condiciones"
						name="aceptar" 
						handleChange={handleChangeSwitch}
						fullWidth={true}/>
				</Grid>
			</Grid>
            <Disclamer />
            <Box sx={{display:'flex',flexDirection:'column',pt:2, alignContent:'center', alignItems:'center'}}>
				<Box sx={{flex: '1 1 auto'}}>
					<Button color='primary' onClick={handleBack} sx={{mr:1}} variant="outlined" startIcon={<ArrowBackIcon />}>
					    REGRESAR
					</Button>
					<Button 
						disabled={!(condiciones.condi && condiciones.aceptar)} color='primary' 
						onClick={()=>setOpen(true)} 
						sx={{mr:1}} 
						variant="outlined"
						endIcon={<AssignmentTurnedInIcon />}>
							FINALIZAR
					</Button>
				</Box>	
			</Box>
            <MyDialog 
				type="ALERT"
				title={data.tipo_solicitud}
				content={`Enviar datos correspondientes a su solicitud: ${data.tipo_solicitud}`}
				open={open}
				setOpen={setOpen}
				actionFunc={handleFinish}
			/>
        </Box>
    )
}
