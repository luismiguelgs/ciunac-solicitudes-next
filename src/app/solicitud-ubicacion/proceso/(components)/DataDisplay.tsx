import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import IsolUbicacion from '@/interfaces/IsolUbicacion'

type Props = {
    data:IsolUbicacion
}

export default function DataDisplay({data}:Props)
{
    return(
        <Grid container spacing={0.5} justifyContent={'center'}>
			<Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
				Tipo de solicitud: <b>{data.tipo_solicitud}</b>
				</Typography>
			</Grid>
			<Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
				Email: <b>{data.email}</b>
				</Typography>
			</Grid>
			<Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
				DNI: <b>{data.dni}</b>
				</Typography>
			</Grid>
			<Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
				Trabajador UNAC: <b>{data.trabajador ? 'SI':'NO'}</b>
				</Typography>
			</Grid>
			<Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
				Alumno CIUNAC: <b>{data.alumno_ciunac ? 'SI':'NO'}</b>
				</Typography>
			</Grid>
			<Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
				Celular: <b>{data.telefono}</b>
				</Typography>
			</Grid>
			<Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
				Apellidos: <b>{data.apellidos}</b>
				</Typography>
			</Grid>
			<Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
				Nombres: <b>{data.nombres}</b>
				</Typography>
			</Grid>
			<Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
				Idioma: <b>{data.idioma}</b>
				</Typography>
			</Grid>
			<Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
				Nivel: <b>{data.nivel}</b>
				</Typography>
			</Grid>
          {
            data.facultad && 
            <Grid size={{xs:12, md:6}}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Facultad: <b>{data.facultad}</b>
              </Typography>
            </Grid>
          }
          {
            data.codigo &&
            <Grid size={{xs:12, md:6}}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Código: <b>{data.codigo}</b>
              </Typography>
            </Grid>
          }
            <Grid size={{xs:12, md:6}}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Código de voucher: <b>{data.numero_voucher}</b>
              </Typography>
            </Grid>
            <Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
					Fecha de Pago: <b>{data.fecha_pago}</b>
				</Typography>
            </Grid>
            <Grid size={{xs:12, md:6}}>
				<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
					Monto Pagado: <b>S/{data.pago}</b>
				</Typography>
            </Grid>
            {
				data.tipo_trabajador && (
					<Grid size={{xs:12, md:6}}>
						<Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
							Tipo de Trabajador: <b>{data.tipo_trabajador}</b>
						</Typography>
					</Grid>
				)
			}
			<Grid size={{xs:12, md:6}}>
            </Grid>
        </Grid>
    ) 
}