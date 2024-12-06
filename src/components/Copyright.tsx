import { Box, Link, Typography } from "@mui/material";
import logoCiunac from '../../public/logo_ciunac.jpg'
import packageJson from "../../package.json";

function getVersion(){
    return packageJson.version
}

export default function Copyright() 
{
    
    return (
        <Box sx={{ my: 1, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <img src={logoCiunac.src} style={{width:'310px'}} />
            <Typography variant="body2" color="text.secondary" align="center" mt={1}>
                {'Copyright © '}
                <Link color="inherit" href="https://ciunac.unac.edu.pe/">
                    CIUNAC
                </Link>
                {` ${new Date().getFullYear()}. version: ${getVersion()}`}
            </Typography>
        </Box>
    )
}
