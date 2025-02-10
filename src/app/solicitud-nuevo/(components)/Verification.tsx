import { Alert, Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik';
import { useMask } from '@react-input/mask'
import verificationSchema from '../(schemas)/verification.schema';
import Iverfication from '../(interfaces)/verification.interface';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Grid from '@mui/material/Grid2';
import EmailIcon from '@mui/icons-material/Email';
import ReCAPTCHA from 'react-google-recaptcha';
import ControlStepper from './ControlStepper';
import Image from 'next/image';
import { MySnackBar } from '@/components/mui';

type Props = {
    activeStep : number
    handleBack: () => void
    handleNext: (values:Iverfication) => void
}

export default function Verification({activeStep, handleBack, handleNext}:Props) 
{
    const codeRef = useMask({ mask: '_-_-_-_', replacement: { _: /\d/ } });
    const captchaRef = React.useRef<ReCAPTCHA>(null)

    const [disabled, setDisabled] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [msgSnack, setMsgSnack] = React.useState<string>('');
    const [timeLeft, setTimeLeft] = React.useState<number | null>(null);
    
    const formik = useFormik<Iverfication>({
        initialValues: {
            email: '',
            code: '',
        },
        validationSchema: verificationSchema,
        onSubmit: (values) => {
            if(!captchaRef.current?.getValue()){
                setMsgSnack('Por favor, confirme que no eres un robot')
                setOpen(true)
            }else{
                setOpen(false)
                const code = values.code.replace(/-/g, '').trim();
                const verificationNumber = String(getVerificationNumber()).trim();
                
                if(verificationNumber === code){
                    //alert(JSON.stringify(values, null, 2));
                    handleNext(values)
                }
                else{
                    setMsgSnack('El código de verificación es incorrecto')
                    setOpen(true)
                }
            }
        },
    });

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    React.useEffect(() => {
        if (timeLeft !== null && timeLeft > 0) {
            const intervalId = setInterval(() => {
                setTimeLeft(prev => prev! - 1);
            }, 1000);

            return () => clearInterval(intervalId); // Clean interval
        }

        if (timeLeft === 0) {
            setDisabled(false); // Enabled after 5 minutes
            setTimeLeft(null); // Stop Timer
        }
    },[timeLeft])

    return (
        <>
        <Box component="form" sx={{p:2}} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
                <Grid size={{ xs: 12, sm: 6}}>
                    <Box sx={{ alignContent:'center',alignItems:'center', display:'flex', flexDirection:'column', mt:1}} >
                        <Typography variant="h4" gutterBottom sx={{textTransform:'uppercase'}}>
                            Verificación de correo electrónico
                        </Typography>
                        <Image src={'/email-verification.png'} alt='logo' width={190} height={190} />
                        <Alert severity="warning" sx={{mt:2, fontSize:'1.2rem'}}>
                            <b>Comprobar tu correo electronico:</b> Hacer click en <b>COMPROBAR</b>, se le enviará un correo electrónico a la dirección que proporcionó 
                            con un número de verificación. Deberá ser ingresado en la caja de texto de <b>código de verificación</b> En caso no vea el código
                            en su bandeja principal, puede verificar en correos no deseados (SPAM).
                        </Alert>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6}} pt={3}>
                    <TextField      
                        required
                        name='email'
                        fullWidth
                        disabled={disabled}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        label="Email"
                        slotProps={{ input:{
                            startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>),
                        }}}
                        variant="outlined"
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <Box sx={{ alignContent:'center',alignItems:'center', display:'flex', flexDirection:'column', mt:2}} >
                        <Button disabled={disabled} variant="contained" startIcon={<CheckCircleOutlineIcon />} size='large' sx={{mb:2}} onClick={verifyEmail}>
                            Comprobar
                        </Button>
                        <TextField
                            required
                            inputRef={codeRef}
                            fullWidth
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            name="code"
                            label="Código de Verificación"
                            helperText={formik.touched.code && formik.errors.code}
                        />
                    </Box>
                    {/* Mostrar cronómetro si el tiempo restante es mayor que 0 */}
                    {timeLeft !== null && (
                        <Typography variant="h6" sx={{textAlign: 'center', mt: 2}}>
                            Tiempo restante: {formatTime(timeLeft)}
                        </Typography>
                    )}
                    <Box sx={{ alignContent:'center',alignItems:'center', p:3, display:'flex', flexDirection:'column'}} >
                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string} ref={captchaRef} />
                    </Box>
                </Grid>
            </Grid>
            <ControlStepper activeStep={activeStep} handleBack={handleBack} steps={3}/>
        </Box>
        <MySnackBar 
            open= {open}
            content={msgSnack}
            setOpen={setOpen}
            variant='filled'
            severity="error" /> 
        </>
    )

    /**
     * Sends an email verification to the user with a random number.
     * Stores the random number and expiration time in localStorage.
     * Starts a 5 minute timer after which the user can request a new verification email.
     */
    async function verifyEmail()  
    {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formik.values.email)) {
            setMsgSnack('Por favor, ingrese una dirección de correo electrónico válida');
            setOpen(true);
            return; // Prevent form submission if email is invalid
        }
        // disable button for 5 minutes
        setDisabled(true)
        setTimeLeft(5 * 60); // start the 5 minute timer
        // generate a random 4-digit number
        const randomNumber = Math.floor(Math.random() * 9000 + 1000);

        // set expiration time to 5 minutes from now
        const expirationTime = new Date().getTime() + 5 * 60 * 1000;

        // save number and expiration time in localStorage
        localStorage.setItem('verificationNumber', JSON.stringify({ randomNumber, expirationTime }));

        // send email verification
        try{
            const response =  await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify({ type: 'RANDOM', email: formik.values.email, number: randomNumber })
            })
            if (response.ok) {
                console.log('Email verification sent successfully');
            } else {
                console.error('Failed to send verification email');
            }
        }catch(error){
            console.error('An error occurred while sending the email:', error);
        }
        
        // disable button after 5 minutes (300,000 ms)
        setTimeout(() => {
            setDisabled(false);
        }, 5 * 60 * 1000);
    }

    /**
     * Returns the verification number stored in localStorage if it exists and has not expired.
     * If the number has expired, it is removed from localStorage.
     * @returns {string} The verification number if it exists and has not expired, otherwise an empty string.
     */
    function getVerificationNumber():string {
        const storedData = localStorage.getItem('verificationNumber');
        if (storedData) {
            const { randomNumber, expirationTime } = JSON.parse(storedData);
            const currentTime = new Date().getTime();
            
            // verify if number has expired
            if (currentTime < expirationTime) {
                return randomNumber; // valid number
            } else {
                localStorage.removeItem('verificationNumber'); // Borrar el dato si ha expirado
            }
        }
        return ''; // if it does not exist or has expired
    }
}
