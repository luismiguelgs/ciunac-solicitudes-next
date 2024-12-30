'use client'
import useStore from '@/hooks/useStore'
import { ITipoSolicitud } from '@/interfaces/type.interface'
import TypesService from '@/services/types.service'
import { useDocumentsStore } from '@/stores/types.stores'
import { Skeleton } from '@mui/material'
import React from 'react'
import { MySelect } from './mui'

type Props = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    error: boolean | undefined
    value: string | number
    disabled?: boolean
    helperText: React.ReactNode,
    ubication?: boolean
}

export default function SelectRequest({handleChange, error, value, helperText, disabled, ubication=false}:Props) 
{
    const init = useStore(useDocumentsStore, (state) => state.documents);
    const [data, setData] = React.useState<ITipoSolicitud[] | undefined>(init); 

    React.useEffect(() => {
        const getData = async () => {
            const subs = await TypesService.fetchTipoCertificados()
            
            let filter:ITipoSolicitud[] = []
            
            if(!ubication){
                filter = subs.filter(item => item.value !== 'EXAMEN_DE_UBICACION')
            }else{
                filter = subs.filter(item => item.value === 'EXAMEN_DE_UBICACION')
            }
            useDocumentsStore.setState({ documents: filter })
            setData(filter)
        }
        if(!data) getData()
    }, []);

    if(!data){
        return <Skeleton variant='rectangular' height={55} width={'70%'} />
    }

    return (
        data && (
            <MySelect
                data={data}
                handleChange={handleChange}
                error={error}
                sx={{width:'70%'}}
                label='Solicitud'
                disabled={disabled}
                name='tipo_solicitud'
                value={value}
                helperText={helperText} 
            />
        )
    )
}
