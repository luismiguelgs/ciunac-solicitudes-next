import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import React from 'react'
import 'dayjs/locale/es';
dayjs.locale('es');

type Props = {
    label : string,
    name : string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik : any,
    value?: Dayjs | null,
    error?: boolean,
    helperText: string
}

export default function DateInput({label,value, name, formik, error, helperText}:Props) 
{
    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DatePicker 
                    label={label}
                    name={name}
                    value={value}
                    onChange={(date)=>formik.setFieldValue(name,date)} 
                    maxDate={dayjs(new Date())}
                    slotProps={{
                        textField:{
                            fullWidth:true,
                            error: error,
                            helperText: helperText
                        }
                    }}
                />
            </LocalizationProvider>
        </React.Fragment>
    )
}
