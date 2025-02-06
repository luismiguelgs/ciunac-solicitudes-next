'use client'
import useStore from '@/hooks/useStore'
import { Icurso } from '@/interfaces/type.interface'
import TypesService from '@/services/types.service'
import { useFacultiesStore } from '@/stores/types.stores'
import React from 'react'
import { MySelect } from './mui'
import { Skeleton } from '@mui/material'

type Props = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    error: boolean | undefined
    value: string | number
    disabled?: boolean
    helperText: React.ReactNode,
    margin?: boolean
}
export default function SelectFaculty({handleChange, error, value, helperText, disabled, margin=true}:Props) 
{
    const init = useStore(useFacultiesStore, (state) => state.faculties);
    const [data, setData] = React.useState<Icurso[] | undefined>(init);

    React.useEffect(() => {
        const getData = async () => {
            const subs = await TypesService.fetchFacultades()
            useFacultiesStore.setState({ faculties: subs })
            setData(subs)
        }
        if(!data) getData()
    }, []);

    if(!data) return (<Skeleton variant='rectangular' height={55} sx={{mt:1}}/>)
    
    return (
        data && (
            <MySelect
                data={data}
                handleChange={handleChange}
                error={error}
                label='Facultad'
                name='facultad'
                value={value}
                sx= {{mt: margin ? 1 : 0}}
                disabled={disabled}
                helperText={helperText}
            />
        )
    )
}
