import Isolicitud from "@/interfaces/solicitud.interface";
import SolicitudesService from "@/services/solicitudes.service";
import { Alert, Avatar, Card, CardContent, CardHeader, CardMedia, CssBaseline, Paper, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Timestamp } from 'firebase/firestore';
import proceso1 from '@/assets/2.png'
import proceso2 from '@/assets/3.png'
import Download from "./Download";
import TypesService from "@/services/types.service";
import { Itexto } from "@/interfaces/type.interface";

async function getRequests(dni:string){
    const res = await SolicitudesService.getItem(dni) as Isolicitud[];
    return res
}
async function getTextos(){
    const res = await TypesService.fetchTextos() as Itexto[];
    return res
}

export default async function ConsultDetailPage(params:{params:{dni:string}}) 
{
    const {dni} = params.params
    const data = await getRequests(dni);
    const textos = await getTextos();

    return (
        <Grid container spacing={2} component={"main"} sx={{ height: "90vh"}}>
            <CssBaseline />
            <Grid size={{xs:12, sm:8, md:5}} component={Paper} elevation={6} square sx={{ p:3}}>
            {
                data.length > 0 && (<>
                    <Typography variant="h5">{`${data[0].apellidos} ${data[0].nombres}`}</Typography>
                    <Stack spacing={2}>
                    {
                            data.map((item) => (
                                <Card key={item.id}>
                                    <CardHeader avatar={
                                        <Avatar>
                                        {
                                            item.estado === 'NUEVO' ? 
                                                (<HourglassBottomIcon color='info'/>) : 
                                                    item.estado === 'ELABORADO' ?
                                                        (<CheckCircleIcon  color='success'/>) : 
                                                        (<ThumbUpOffAltIcon />)
                                        
                                        }
                                        </Avatar>}
                                        title={item.solicitud}
                                        subheader={(new Date((item.creado as Timestamp).seconds * 1000)).toLocaleDateString()}>
                                    </CardHeader>
                                    {
                                        item.estado === 'NUEVO' ? 
                                        (<CardMedia
                                            component="img"
                                            //height="170"
                                            sx={{p:0, minHeight:'50px'}}
                                            image={proceso1.src}
                                            alt="Proceso"
                                        />) : 
                                        item.estado === 'ELABORADO' ?
                                            (<CardMedia
                                                component="img"
                                                //height="170"
                                                sx={{p:0, minHeight:'50px'}}
                                                image={proceso2.src}
                                                alt="Proceso2"
                                            />) : null
                                    }
                                    <CardContent>
                                        <Typography variant="h6" color="text.secondary">
                                                Idioma: <b>{item.idioma}</b> Nivel: <b>{item.nivel}</b>
                                        </Typography>
                                        <Download item={item} textos={textos}/>
                                    </CardContent>
                                </Card>            
                            ))
                    }
                        <Alert severity='info' sx={{m:1}}>
                            {textos.find(objeto=> objeto.titulo === 'texto_ubicacion_5')?.texto}
                        </Alert>
                    </Stack>
                </>)
            } 
            </Grid>
        </Grid>        
    )
}
