'use client'
import TypesService from '@/services/types.service'
import { useDocumentsStore, useFacultiesStore, useSubjectsStore, useTextsStore } from '@/stores/types.stores'
import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

export default function Loading() 
{
    console.log('loading...');
    
    React.useEffect(() => {
        const types = async () => {
            const request = await TypesService.fetchTipoCertificados()
            useDocumentsStore.setState({ documents: request })
            const textos = await TypesService.fetchTextos()
            useTextsStore.setState({ textos: textos })
            const facul = await TypesService.fetchFacultades()
            useFacultiesStore.setState({ faculties: facul })
            const subs = await TypesService.fetchCursos()
            useSubjectsStore.setState({ subjects: subs })
        }
        types()
    }, [])

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="80vh"
        >
            <CircularProgress size={60} />
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Cargando...
            </Typography>
        </Box>
    )
}
