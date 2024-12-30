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
                        {textos?.find(objeto=> objeto.titulo === 'texto_1_final')?.texto}
                    </Alert>
                )
            }
            <Alert sx={{mt:2}} severity="warning" variant='filled'>
				{textos?.find(objeto=> objeto.titulo === 'texto_1_disclamer')?.texto}
			</Alert>
			<Alert sx={{mt:2}} severity="warning" variant='filled'>
				{textos?.find(objeto=> objeto.titulo === 'texto_2_disclamer')?.texto}
			</Alert>
        </React.Fragment>
    )
}
