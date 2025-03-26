'use client'
import useFormStore from '@/stores/solicitud.store';
import { Box, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import BasicData from './(components)/BasicData';
import FinData from '@/components/FinData';
import Final from './(components)/Final';
import Documentos from './(components)/Documentos';
import Before2010 from './(components)/Before2010';
import { Irow } from '@/interfaces/type.interface';

export default function Process({params}:{params:{[key:string]:string | string[] | undefined}}) 
{
    
    const { trabajador, tipo_solicitud, antiguo, email, dni, pago, tipo_trabajador} = params

    const [activeStep, setActiveStep] = React.useState(0);
    const formData = useFormStore((state) => state.formData);
    const updateFormData = useFormStore((state) => state.updateFormData);

    //arreglo de cursos con fechas antes del 2010 (opcional) **********************************************
    const [rows, setRows] = React.useState<Irow[]>([])

    React.useEffect(() => {
        const old = antiguo === 'true';
        const worker = trabajador === 'true';
        updateFormData('verifyData', {
            tipo_solicitud: tipo_solicitud, 
            trabajador: worker, 
            antiguo: old, 
            email: email, 
            dni: dni,
            tipo_trabajador: tipo_trabajador,
        });
    }, [tipo_solicitud]);

    // Cálculo dinámico de pasos
    const baseSteps = ["Datos básicos", "Datos de Pago", "Finalizar"];
    const optionalSteps = [];
    if (trabajador === 'true') optionalSteps.push("Documentos");
    if (antiguo === 'true') optionalSteps.push("Cursos antes del 2010");
    const steps = [...baseSteps.slice(0, 2), ...optionalSteps, ...baseSteps.slice(2)];

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const renderSteps =() => {
        const workerIndex = baseSteps.length - 1; // Posición del paso "Documentos"
        const before2010Index = workerIndex + (trabajador === 'true' ? 1 : 0); // Posición del paso "Antes del 2010"

        switch (activeStep) {
            case 0:
                return <BasicData onNext={handleNext}  />; 
            case 1:
                return <FinData onBack={handleBack} onNext={handleNext} trabajador={trabajador==='true'} precio={Number(pago)}/>; 
            case workerIndex:
                if (trabajador === 'true') {
                    return <Documentos onBack={handleBack} onNext={handleNext} />;
                }
                if (antiguo === 'true' && trabajador !== 'true') {
                    return <Before2010 rows={rows} setRows={setRows} onBack={handleBack} onNext={handleNext} />;
                }
                return <Final data={formData} handleBack={handleBack} />;
            case before2010Index:
                if (antiguo === 'true') {
                    return <Before2010 rows={rows} setRows={setRows} onBack={handleBack} onNext={handleNext} />;
                }
                return <Final data={formData} handleBack={handleBack} />;
            case steps.length - 1:
                return <Final data={formData} handleBack={handleBack} />;
            default:    
                return null;
        }
    }

    return (
        <Box sx={{width:'100%'}}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {
                    steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
            <Box sx={{mt: 2}}>
                {renderSteps()}
            </Box>
        </Box>
    )
}
