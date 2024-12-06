import useStoreRequest from "@/stores/request.store";
import Process from "./Process";
import { Box } from "@mui/material";
import { MyAppBar } from "@/components/mui";

export default function ProcessPage({searchParams}:{searchParams:{[key:string]:string | string[] | undefined}}) 
{
    console.log(searchParams);

    const {tipo_solicitud, trabajador, antiguo, email, dni} = searchParams
    const { setRequest } = useStoreRequest();

    setRequest('tipo_solicitud', tipo_solicitud)
    setRequest('trabajador', trabajador)
    setRequest('antiguo', antiguo)
    setRequest('email', email)
    setRequest('dni', dni)


    return (
        <Box width={'100%'} p={2} sx={{flexGrow:1}}>
            <MyAppBar title={`SOLICITUD: ${searchParams?.tipo_solicitud ?? ''}`}  />
            <Process />
        </Box>
    )
}
