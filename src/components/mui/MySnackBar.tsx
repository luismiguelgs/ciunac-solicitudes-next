import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

type Props = {
    content:string,
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    severity?:"error"|"info"|"success"|"warning"
    variant?: "standard" | "filled" | "outlined"
}

export default function MySnackBar({content, open, setOpen, severity='info', variant='standard'}:Props) 
{
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant={variant} onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {content}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
