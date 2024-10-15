import { Box, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import Ibasicinfo from '../(interfaces)/basicinfo.interface';
import basicinfoSchema from '../(schemas)/basicinfo.schema';
import { GENERO, TIPO_DOCUMENTO } from '@/libs/constants';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useMask } from '@react-input/mask';
import { MySelect } from '@/components/mui';
import Grid from '@mui/material/Grid2';
import ControlStepper from './ControlStepper';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import useStore from '@/stores/student.store';

type Props = {
    programs : any[]
    activeStep : number
    handleBack: () => void
    handleNext: (values:any) => void
}
export default function BasicData({activeStep, handleBack, handleNext, programs}:Props) 
{ 
    const phoneRef = useMask({ mask: '_________', replacement: { _: /\d/ } });
    const dniRef = useMask({ mask: '_________', replacement: { _: /\d/ } });
    const firstLastNameRef = useMask({ mask: '______________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const secondLastNameRef = useMask({ mask: '_______________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })

    const { student } = useStore()
    
    const formik = useFormik<Ibasicinfo>({
        initialValues: {
            firstLastname: student.Primer_apellido,
            secondLastname: student.Segundo_apellido,
            firstName: student.Primer_nombre,
            secondName: student.Segundo_nombre,
            document_type: student.Codigo_tipo_identificacion,
            document: student.Numero_identificacion,
            gender: student.Genero,
            birthDate: dayjs(new Date(student.Fecha_nacimiento)) ? dayjs(new Date(student.Fecha_nacimiento)) : null,
            phone : student.Celular,
            code_program: student.Codigo_programa
        },
        validationSchema: basicinfoSchema,
        onSubmit: (values) => {
            values.birthDate = values.birthDate.format('YYYY-MM-DDTHH:mm:ssZ')
            //alert(JSON.stringify(values, null, 2));
            handleNext(values)
        },
    });
    return (
        <Box component="form" sx={{p:2}} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} justifyContent={'center'}>
                
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <TextField
                        required
                        type='text'
                        inputRef={firstLastNameRef}
                        fullWidth
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstLastname && Boolean(formik.errors.firstLastname)}
                        value={formik.values.firstLastname}
                        onChange={formik.handleChange}
                        name="firstLastname"
                        label="Primer Apellido"
                        helperText={formik.touched.firstLastname && formik.errors.firstLastname}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <TextField
                        required
                        type='text'
                        inputRef={secondLastNameRef}
                        fullWidth
                        onBlur={formik.handleBlur}
                        error={formik.touched.secondLastname && Boolean(formik.errors.secondLastname)}
                        value={formik.values.secondLastname}
                        onChange={formik.handleChange}
                        name="secondLastname"
                        label="Segundo Apellido"
                        helperText={formik.touched.secondLastname && formik.errors.secondLastname}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <TextField
                        required
                        //ref={nombreRef}
                        fullWidth
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        name="firstName"
                        label="Primer Nombre"
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <TextField
                        fullWidth
                        //ref={nombreRef}
                        onBlur={formik.handleBlur}
                        error={formik.touched.secondName && Boolean(formik.errors.secondName)}
                        value={formik.values.secondName}
                        onChange={formik.handleChange}
                        name="secondName"
                        label="Segundo Nombre"
                        helperText={formik.touched.secondName && formik.errors.secondName}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <MySelect 
                            data={GENERO}
                            label="Género"
                            fullWidth
                            name="gender"
                            value={formik.values.gender}
                            handleChange={formik.handleChange}
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                            helperText={formik.touched.gender && formik.errors.gender}
                        />
                </Grid>
                <Grid size={{xs:12, sm:6, md:4}} display={'flex'}>
                    <MySelect 
                        data={TIPO_DOCUMENTO}
                        sx={{width:'50%', mr:1}}
                        label="Tipo de Documento"
                        fullWidth={false}
                        name="document_type"
                        value={formik.values.document_type}
                        handleChange={formik.handleChange}
                        error={formik.touched.document_type && Boolean(formik.errors.document_type)}
                        helperText={formik.touched.document_type && formik.errors.document_type}
                    />
                    <TextField
                        inputRef={dniRef }
                        required
                        fullWidth
                        error={formik.touched.document && Boolean(formik.errors.document)}
                        value={formik.values.document}
                        onChange={formik.handleChange}
                        name="document"
                        label="Documento de Identidad"
                        helperText={formik.touched.document && formik.errors.document}
                    />
                </Grid>
                <Grid size={{xs:12, sm:6, md:4}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label="Fecha Nacimiento"
                            name='birthDate'
                            value={formik.values.birthDate}
                            onChange={(date)=>formik.setFieldValue('birthDate',date)} 
                            maxDate={dayjs(new Date())}
                            slotProps={{
                                textField:{
                                    fullWidth:true,
                                    error: Boolean(formik.touched.birthDate) && Boolean(formik.errors.birthDate),
                                    helperText: (formik.touched.birthDate && formik.errors.birthDate) as string
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md:4 }}>
                    <TextField
                        inputRef={phoneRef}
                        required
                        fullWidth
                        name='phone'
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        type='text'
                        label="Celular"
                        slotProps={{ input:{
                            startAdornment: (<InputAdornment position="start"><WhatsAppIcon /></InputAdornment>),
                        }}}        
                        variant="outlined"
                        helperText={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
                    />
                </Grid>
               
                <Grid size={{xs:12, sm:6, md:4}}>
                    <FormControl fullWidth>
                        <InputLabel id="select-program">Programa</InputLabel>
                        <Select 
                            labelId="select-program"
                            id='code_program'
                            error={formik.touched.code_program && Boolean(formik.errors.code_program)}
                            name='code_program'
                            value={formik.values.code_program}
                            label="Programa"
                            onChange={formik.handleChange}
                        >
                        {
                            programs.map((program: any) => (
                                <MenuItem key={program.Codigo} value={program.Codigo}>
                                    {program.Nombre}
                                </MenuItem>
                            ))
                        }
                        </Select>
                        <FormHelperText>{formik.touched.code_program && formik.errors.code_program}</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
            <ControlStepper activeStep={activeStep} handleBack={handleBack} steps={3}/>
        </Box>
    )
    
}
