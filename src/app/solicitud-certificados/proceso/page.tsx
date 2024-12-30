import Process from "./Process";
import { Box } from "@mui/material";
import { MyAppBar } from "@/components/mui";

export default function ProcessPage({searchParams}:{searchParams:{[key:string]:string | string[] | undefined}}) 
{
    
    return (
        <Box p={1} flexGrow={1}>
            <MyAppBar title={`SOLICITUD: ${searchParams?.tipo_solicitud ?? ''}`}  />
            <Process params={searchParams}/>
        </Box>
    )
}
