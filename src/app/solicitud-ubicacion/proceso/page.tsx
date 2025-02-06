'use client'
import useFormStore from '@/stores/rexamubication.store'
import { Box, Step, StepLabel, Stepper } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import BasicData from './(components)/BasicData'
import FinData from './(components)/FinData'
import Documents from './(components)/Documents'
import Final from './(components)/Final'

function ProcesoContent()
{
	const searchParams = useSearchParams()
	const [activeStep, setActiveStep] = React.useState<number>(0)

    //store
    const formData = useFormStore((state) => state.formData)
    const updateFormData = useFormStore((state) => state.updateFormData)

	React.useEffect(()=>{
        let price = Number(searchParams.get('pago'))
        const worker = searchParams.get('trabajador') === 'true'
        const alumno = searchParams.get('alumno_ciunac') === 'true'
        if(worker){
          price = price * 0.8
        }
        updateFormData('verifyData', {
            dni: searchParams.get('dni'),
            email: searchParams.get('email'),
            trabajador: worker,
            alumno_ciunac: alumno,
            tipo_solicitud: searchParams.get('tipo_solicitud'),
            pago: price
        })
    },[searchParams.get('dni'), searchParams.get('email'), searchParams.get('trabajador'), searchParams.get('alumno_ciunac'), searchParams.get('tipo_solicitud'), searchParams.get('pago')])


	//functions ***
    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

	const steps = [
        {
            label:'Información Básica', 
            component: (<BasicData onNext={handleNext} />), 
        },
        {   
            label: 'Información De pago', 
            component: (<FinData onBack={handleBack} onNext={handleNext} trabajador={searchParams.get('trabajador')==='true'} precio={Number(searchParams.get('pago'))} />), 
        },
    ]
    if(searchParams.get('alumno_ciunac') === 'true' || searchParams.get('trabajador') === 'true'){
        steps.push({
            label:"Certificados", 
            component:(<Documents onBack={handleBack} onNext={handleNext}/>), 
        }, {
            label:'Paso final',
            component:(<Final data={formData} handleBack={handleBack} />),
        })
    }else{
        steps.push({
            label:'Paso final',
            component:(<Final data={formData} handleBack={handleBack}/>),
        })
    }

	return (
		<Box p={2} flexGrow={1}>
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
                    activeStep  === steps.length ? (
                        steps[steps.length-1].component
                    ):(
                        steps[activeStep].component
                    )
                }
            </Box>
		</Box>
	)
}

// Main component with Suspense boundary
export default function ProcesoPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <ProcesoContent />
        </React.Suspense>
    );
}