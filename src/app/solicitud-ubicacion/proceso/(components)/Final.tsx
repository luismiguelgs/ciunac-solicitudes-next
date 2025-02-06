'use client'
import { MyDialog } from '@/components/mui'
import useStore from '@/hooks/useStore'
import SolicitudesExamenService from '@/services/solicitud-examen.service'
import { FormDataUbicationExam } from '@/stores/rexamubication.store'
import { useTextsStore } from '@/stores/types.stores'
import { Alert, Box, Button, Link } from '@mui/material'
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid2';
import React from 'react'
import IsolUbicacion from '@/interfaces/IsolUbicacion'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataDisplay from './DataDisplay'
import SwitchResaltado from '@/components/SwitchResaltado'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Disclamer from './Disclamer'
type Props = {
    data:FormDataUbicationExam,
    handleBack : () => void,
}

type Condiciones = {
    condi:boolean,
    aceptar:boolean
}
export default function Final({data, handleBack}:Props) 
{
	const textos = useStore(useTextsStore, (state) => state.textos)

	const [open, setOpen] = React.useState<boolean>(false)
	const router = useRouter()
    const [condiciones, setCondiciones] = React.useState<Condiciones>({condi:false, aceptar:false})

	const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCondiciones({
	  	...condiciones,
	  	[event.target.name]: event.target.checked,
		});
	};

	const handleFinish = async() =>{
		//guardar nuevo registro
		const resId =  await SolicitudesExamenService.newItem({...data.verifyData, ...data.basicData, ...data.finData} as IsolUbicacion)
		//Ir a la pagina final
		router.push(`/solicitud-ubicacion/final/?id=${resId}`)
		setOpen(false)
	}

	return (
		<Box sx={{m:2, display:'flex', flexDirection:'column'}}>
			<Alert sx={{mt:2, mb:2}} severity="info">
				{textos?.find(objeto=> objeto.titulo === 'texto_ubicacion_3')?.texto}
                <Link href="https://ciunac.unac.edu.pe/">ciunac.unac.edu.pe</Link>
			</Alert>
			<DataDisplay data={{...data.verifyData, ...data.basicData, ...data.finData} as IsolUbicacion} />
			<Grid container spacing={1} justifyContent='center'>
				<Grid size={{xs:6}}>
					<SwitchResaltado
						checked={condiciones.condi}
						mensaje='Marcar si los datos indicados lineas arriba son los correctos' 
						label="Los datos proporcionados son los correctos"
						name="condi" 
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
			<Disclamer textos={textos} />
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
				title={data?.verifyData?.tipo_solicitud as string}
				content={`Enviar datos correspondientes a su solicitud: ${data.verifyData?.tipo_solicitud}`}
				open={open}
				setOpen={setOpen}
				actionFunc={handleFinish}
			/>
		</Box>
	)
}
