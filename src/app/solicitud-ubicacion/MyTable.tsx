'use client'

import IcronogramaExam from "@/interfaces/cronogramaExam.interface"
import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table } from '@mui/material';
import { styled } from '@mui/system'; // Para usar estilos personalizados

// Contenedor con ancho máximo y centrado
const StyledContainer = styled('div')({
    maxWidth: '650px', // Ajusta este valor según tus necesidades
    margin: '0 auto', // Centra el contenedor
    padding: '0 16px', // Añade un poco de padding en los lados
});


export default function MyTable({cronogramas}:{cronogramas:IcronogramaExam[]}) : JSX.Element 
{
    const datosOrdenados = cronogramas.sort((a, b) => a.period.localeCompare(b.period));

    return(
        <StyledContainer>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell 
                            sx={{
                                backgroundColor: '#1976d2', // Color de fondo
                                color: 'white', // Color del texto
                                fontWeight: 'bold', // Texto en negrita
                                fontSize: '1.1rem', // Tamaño de fuente
                                }} 
                            align='center'>
                                Módulo
                            </TableCell>
                        <TableCell 
                            sx={{
                                backgroundColor: '#1976d2', // Color de fondo
                                color: 'white', // Color del texto
                                fontWeight: 'bold', // Texto en negrita
                                fontSize: '1.1rem', // Tamaño de fuente
                            }}
                            align='center'>
                                Fecha
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    datosOrdenados.map((row:IcronogramaExam) => (
                        <TableRow key={row.id}>
                            <TableCell align='center'>{row.period}</TableCell>
                            <TableCell align='center'>{new Date(row.date).toLocaleDateString('es-ES')}</TableCell>
                        </TableRow>
                    ))
                }
                </TableBody>
                </Table>
            </TableContainer>
        </StyledContainer>
    )
}