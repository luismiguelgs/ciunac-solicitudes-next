'use client'
import { Itexto } from '@/interfaces/type.interface'
import TypesService from '@/services/types.service'
import React from 'react'
import useStore from './useStore'
import { useTextsStore } from '@/stores/types.stores'

const useTexts = () => {
    const textos = useStore(useTextsStore, (state) => state.textos)
    const [data, setData] = React.useState<Itexto[] | undefined>(textos)

    React.useEffect(() => {
        const getData = async () => {
            const result = await TypesService.fetchTextos()
            useTextsStore.setState({ textos: result })
            setData(result)
        }
        if(!data) getData()
    }, [textos])

    return data
}

export default useTexts