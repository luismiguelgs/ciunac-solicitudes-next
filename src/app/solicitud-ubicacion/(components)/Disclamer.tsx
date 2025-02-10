import useStore from '@/hooks/useStore'
import { useTextsStore } from '@/stores/types.stores'
import { Alert } from '@mui/material'
import React from 'react'


type Props = {
    textoFinal? : boolean
}

export default function Disclamer({textoFinal=false}:Props) 
{
    const textos = useStore(useTextsStore, (state) => state.textos)

    return (
        <React.Fragment>
            {
                textoFinal && (
                    <Alert sx={{mt:2}} severity="info">
                        {textos?.find(objeto=> objeto.titulo === 'texto_ubicacion_3')?.texto}
                    </Alert>
                )
            }
            <Alert sx={{mt:2}} severity="warning" variant='filled'>
				{textos?.find(objeto=> objeto.titulo === 'texto_ubicacion_4')?.texto}
			</Alert>
        </React.Fragment>
    )
}
