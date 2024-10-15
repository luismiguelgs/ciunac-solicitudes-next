"use client"

import { Box, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import Verification from './Verification'
import useStore from '@/stores/student.store'
import BasicData from './BasicData'
import Finish from './Finish'
import Ibasicinfo from '../(interfaces)/basicinfo.interface'
import Iverfication from '../(interfaces)/verification.interface'
import IProgram from '../(interfaces)/programs.interface'

type Props = {
    programs: IProgram[]
}

export default function Process({programs}:Props) {

    //hooks ***
    const [activeStep, setActiveStep] = React.useState<number>(0);
    const { setStudentField } = useStore();

    const handleBack = ():void =>{
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleNext = (values:Ibasicinfo | Iverfication):void =>{
       
        switch (activeStep) {
            case 0:
                const values0 = values as Iverfication
                setStudentField('Email', values0.email);
                break;
            case 1:
                const values1 = values as Ibasicinfo
                setStudentField('Primer_apellido', values1.firstLastname);
                setStudentField('Segundo_apellido', values1.secondLastname);
                setStudentField('Primer_nombre', values1.firstName);
                setStudentField('Segundo_nombre', values1.secondName);
                setStudentField('Genero',values1.gender);
                setStudentField('Codigo_tipo_identificacion', values1.document_type);
                setStudentField('Numero_identificacion', values1.document);
                setStudentField('Fecha_nacimiento', values1.birthDate);
                setStudentField('Telefono', values1.phone);
                setStudentField('Celular', values1.phone);
                setStudentField('Codigo_programa', values1.code_program);
                break;
            case 2:
                console.log('pagina de registro');
                
                break;
        }
        if(activeStep < steps.length - 1){
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
        else{
            console.log('finish');
        }
       
    }

    const steps = [
        {label:'Verificación', component:<Verification activeStep={activeStep} handleNext={handleNext} handleBack={handleBack}/>},
        {label:'Datos Básicos', component:<BasicData activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} programs={programs}/>},
        {label:'Registro', component:<Finish handleBack={handleBack} programs={programs} />},
    ]

    return (
        <Box width='100%' p={1}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {
                        steps.map((item, index)=>(
                            <Step key={index}>
                                <StepLabel>{item.label}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
                <Box p={2}>
                    {
                        activeStep === steps.length ? (
                            steps[steps.length-1].component
                        ):(
                            steps[activeStep].component
                        )
                    }
                </Box>
            </Box>
    )
}
