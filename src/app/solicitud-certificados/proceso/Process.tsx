'use client'
import useStore from '@/hooks/useStore'
import Isolicitud from '@/interfaces/solicitud.interface'
import { Irow } from '@/interfaces/type.interface'
import { IdocumentVal } from '@/interfaces/validation.interface'
import useStoreRequest from '@/stores/request.store'
import { useDocumentsStore } from '@/stores/types.stores'
import { Box, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import DatosBasicos from './(components)/DatosBasicos'
import DatosFinancieros from './(components)/DatosFinancieros'
import Before2010 from './(components)/Before2010'
import Documentos from './(components)/Documentos'
import Final from './(components)/Final'


export default function Process() 
{
    const { setRequest } = useStoreRequest();
    const data = useStore(useStoreRequest, (state) => state.request);
    /*
    const {tipo_solicitud, trabajador, antiguo, email, dni} = data
   
    setRequest('tipo_solicitud', tipo_solicitud)
    setRequest('trabajador', trabajador)
    setRequest('antiguo', antiguo)
    setRequest('email', email)
    setRequest('dni', dni)
    */
    const certificados = useStore(useDocumentsStore, (state) => state.documents)
    
    const [activeStep, setActiveStep] = React.useState<number>(0)
    //página de documentos
    const [docsVal, setDocsVal] = React.useState<IdocumentVal>({cert_trabajador: false, cert_ciunac: false})

    //arreglo de cursos con fechas antes del 2010 (opcional) **********************************************
    const [rows, setRows] = React.useState<Irow[]>([])

    //información de pago *****
    React.useEffect(()=>{
        const precio = certificados?.filter((cer)=> cer.value === data?.tipo_solicitud)[0].precio
        if(data?.trabajador){
            setRequest('pago', (Number(precio)-Number(precio)*0.8))
        }else{
            setRequest('pago', precio)
        }
    },[data?.tipo_solicitud, data?.trabajador])


    const handleBack = ():void =>{
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleNext = (values:Isolicitud):void =>{
        switch(activeStep){
            case 0:
                setRequest('apellidos', values.apellidos)
                setRequest('nombres', values.nombres)
                setRequest('codigo', values.codigo)
                setRequest('facultad', values.facultad)
                setRequest('idioma', values.idioma)
                setRequest('nivel', values.nivel)
                setRequest('celular', values.celular)
                break
            case 1:
                setRequest('numero_voucher', values.numero_voucher)
                setRequest('pago', values.pago)
                setRequest('fecha_pago', values.fecha_pago)
                
                break
            default:
                break
        }
        if(activeStep < steps.length - 1){
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
        else{
            console.log('final');
        }
    }
    const steps = [
        {
            label:'Información Básica', 
            component: (<DatosBasicos onSubmit={handleNext} handleBack={handleBack} activeStep={activeStep} />), 
        },
        {
            label: 'Infomación de Pago',
            component: (<DatosFinancieros onSubmit={handleNext} handleBack={handleBack} activeStep={activeStep} />)
        }
    ]

    if (data?.antiguo){
        steps.push({
            label:'Matricula anterior al 2010', 
            component: (<Before2010 rows={rows} setRows={setRows} activeStep={activeStep} handleBack={handleBack} onSubmit={handleNext}/>)
        })
    }
    if (data?.trabajador){
        steps.push({
            label:'Constancia de trabajo',
            component:(<Documentos validation={docsVal} setValidation={setDocsVal} activeStep={activeStep} handleBack={handleBack} onSubmit={handleNext}/>)
        })
    }
    steps.push({
        label:'Finalizar', 
        component: (<Final constancia={data?.img_cert_trabajo as string} data={data as Isolicitud} handleBack={handleBack} data2010={rows} />)
    })

    return (
        <>
            <Stepper activeStep={activeStep} alternativeLabel>
            {
                steps.map((item, index)=>(
                    <Step key={index}>
                        <StepLabel>{item.label}</StepLabel>
                    </Step>
                ))
            }
            </Stepper>
            <Box>
            {
                activeStep === steps.length ? (
                    steps[steps.length-1].component
                ):(
                    steps[activeStep].component
                )
            }
            </Box>   
        </>
    )
}
