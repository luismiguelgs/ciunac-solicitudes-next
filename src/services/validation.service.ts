import React from 'react'
import { IdocumentVal } from '@/interfaces/validation.interface';
import ISolicitud from '@/interfaces/solicitud.interface';            
import uploadLogo from '@/assets/upload.svg'


export function validationDocuments(data:ISolicitud, setValidation:React.Dispatch<React.SetStateAction<IdocumentVal>>) : boolean
{
    let trabajador = validationUploadImage(data.img_cert_trabajo)
    let alumno = validationUploadImage(data.img_cert_estudio)
        
    const validarTrabajador = ():void => {
        if(trabajador){
            setValidation((prevBasicVal)=>({...prevBasicVal, cert_trabajador:false}))
        }else{
                setValidation((prevBasicVal)=>({...prevBasicVal, cert_trabajador:true}))
        }
    }
    const validarAlumno = ():void => {
        if(alumno){
            setValidation((prevBasicVal)=>({...prevBasicVal, cert_ciunac:false}))
        }else{
            setValidation((prevBasicVal)=>({...prevBasicVal, cert_ciunac:true}))
        }
    }
    if(data.trabajador && data.alumno_ciunac){
        validarTrabajador()
        validarAlumno()
        return trabajador && alumno
    }
    else if(data.trabajador){
        validarTrabajador()
        return trabajador
    }
    else if(data.alumno_ciunac){
        validarAlumno()
        return alumno
    }
    return false
}

export function validationUploadImage(imagen:string | undefined):boolean {
    if(imagen !== uploadLogo){
        return true
    }else{
        return false
    }
}