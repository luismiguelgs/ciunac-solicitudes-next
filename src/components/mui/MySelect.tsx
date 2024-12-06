import { MenuItem, SxProps, TextField } from '@mui/material'
import React from 'react'

type Props = {
    disabled?:boolean,
    name:string,
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void,
    label:string,
    value:unknown
    helperText?: React.ReactNode,
    data:{value: unknown, label: string}[] | undefined,
    error?:boolean,
    sx?:SxProps,
    fullWidth?:boolean
}

export default function MySelect({disabled=false,name,handleChange,label, helperText='', data,value,error=false, sx={},fullWidth=true}:Props) {
  return (
    <React.Fragment>
        {
            data && 
            <TextField
                select
                disabled={disabled}
                fullWidth={fullWidth}
                onChange={e=>handleChange(e)}
                name={name}
                label={label}
                value={value}
                helperText={helperText}
                error={error}
                sx={sx}
            >
            {
                data && data.map((option, index)=>(
                    <MenuItem key={index} value={option.value as string | number}>
                        {(option as { label: string }).label}
                    </MenuItem>
                ))
            }
            </TextField>
        }   
    </React.Fragment>
  )
}
