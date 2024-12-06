'use client'
import { styled } from '@mui/material/styles';
import packageJson from '../../package.json';
export enum DocumentType {
    PE01 = "PE01", //DNI
    PE02 = "PE02" //CE
}
export const DocumentTypeMap: Record<DocumentType, string> = {
    [DocumentType.PE01]: "DNI",
    [DocumentType.PE02]: "C.E."
}
export enum Gender {
    F = "F", //Femenino
    M = "M" //Masculino
}
export const GenderTypeMap: Record<Gender, string> = {
    [Gender.F]: "FEMENINO",
    [Gender.M]: "MASCULINO"
}



export const VERSION = packageJson.version;

export const NIVEL = [
    {value:'BASICO',label:'BÁSICO'},
    {value:'INTERMEDIO',label:'INTERMEDIO'},
    {value:'AVANZADO',label:'AVANZADO'},
]
export const GENERO = [
    {value:Gender.M,label:'MASCULINO'},
    {value:Gender.F,label:'FEMENINO'},
]
export const TIPO_DOCUMENTO = [
    {value:DocumentType.PE01,label:'DNI'},
    {value:DocumentType.PE02,label:'C.E.'},
]
export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const MES = [
    {value:'ENERO',label:'Enero'},
    {value:'FEBRERO',label:'Febrero'},
    {value:'MARZO',label:'Marzo'},
    {value:'ABRIL',label:'Abril'},
    {value:'MAYO',label:'Mayo'},
    {value:'JUNIO',label:'Junio'},
    {value:'JULIO',label:'Julio'},
    {value:'AGOSTO',label:'Agosto'},
    {value:'SETIEMBRE',label:'Setiembre'},
    {value:'OCTUBRE',label:'Octubre'},
    {value:'NOVIEMBRE',label:'Noviembre'},
    {value:'DICIEMBRE',label:'Diciembre'},
]

type CicloTupla = [string, string, number];

export const CICLOS: CicloTupla[] = [
    ['INGLES', NIVEL[0].value, 9],
    ['INGLES', NIVEL[1].value, 9],
    ['INGLES', NIVEL[2].value, 9],
    ['PORTUGUES', NIVEL[0].value, 5],
    ['PORTUGUES', NIVEL[1].value, 4],
    ['PORTUGUES', NIVEL[2].value, 3],
    ['ITALIANO', NIVEL[0].value, 5],
    ['ITALIANO', NIVEL[1].value, 4],
    ['ITALIANO', NIVEL[2].value, 3],
    ['FRANCES', NIVEL[0].value, 5],
    ['FRANCES', NIVEL[1].value, 4],
    ['FRANCES', NIVEL[2].value, 3],
]