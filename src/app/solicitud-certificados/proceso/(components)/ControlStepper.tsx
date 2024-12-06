import { Box, Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
    activeStep : number
    handleBack: () => void
    steps: number
}

export default function ControlStepper({activeStep, handleBack, steps}:Props) {
    return (
        <Box sx={{display:'flex', flexDirection:'row',pt:1, justifyContent: 'space-between'}}>
            <Button
                color='secondary' 
                disabled={activeStep === 0} 
                        onClick={handleBack} 
                        sx={{mr:1}} 
                        variant='contained'
                        startIcon={<ArrowBackIcon />}>
                        REGRESAR
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained"
                        endIcon={<ArrowForwardIcon />} 
                        color="secondary">
                        {activeStep === steps - 1 ? 'TERMINAR':'SIGUENTE'}
                    </Button>
                </Box>
  )
}
