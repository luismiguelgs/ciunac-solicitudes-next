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
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');
import useStore from '@/stores/student.store';
import IProgram from '../(interfaces)/programs.interface';
import DateInput from '@/components/DateInput';

type Props = {
    programs : IProgram[]
    activeStep : number
    handleBack: () => void
    handleNext: (values:Ibasicinfo) => void
}
const getIconByCode = (code:string) => {
    const icons = {
        'FRA-R': <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#fff" d="M10 4H22V28H10z"></path><path d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#092050"></path><path d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 26 16)" fill="#be2a2c"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>,
        'CHI-R': <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#db362f"></rect><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path fill="#ff0" d="M7.958 10.152L7.19 7.786 6.421 10.152 3.934 10.152 5.946 11.614 5.177 13.979 7.19 12.517 9.202 13.979 8.433 11.614 10.446 10.152 7.958 10.152z"></path><path fill="#ff0" d="M12.725 8.187L13.152 8.898 13.224 8.072 14.032 7.886 13.269 7.562 13.342 6.736 12.798 7.361 12.035 7.037 12.461 7.748 11.917 8.373 12.725 8.187z"></path><path fill="#ff0" d="M14.865 10.372L14.982 11.193 15.37 10.46 16.187 10.602 15.61 10.007 15.997 9.274 15.253 9.639 14.675 9.044 14.793 9.865 14.048 10.23 14.865 10.372z"></path><path fill="#ff0" d="M15.597 13.612L16.25 13.101 15.421 13.13 15.137 12.352 14.909 13.149 14.081 13.179 14.769 13.642 14.541 14.439 15.194 13.928 15.881 14.391 15.597 13.612z"></path><path fill="#ff0" d="M13.26 15.535L13.298 14.707 12.78 15.354 12.005 15.062 12.46 15.754 11.942 16.402 12.742 16.182 13.198 16.875 13.236 16.047 14.036 15.827 13.26 15.535z"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>,
        'ING-R': <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect><path d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z" fill="#a62842"></path><path d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z" fill="#a62842"></path><path fill="#a62842" d="M2 11.385H31V13.231H2z"></path><path fill="#a62842" d="M2 15.077H31V16.923000000000002H2z"></path><path fill="#a62842" d="M1 18.769H31V20.615H1z"></path><path d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z" fill="#a62842"></path><path d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z" fill="#a62842"></path><path d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z" fill="#102d5e"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path fill="#fff" d="M4.601 7.463L5.193 7.033 4.462 7.033 4.236 6.338 4.01 7.033 3.279 7.033 3.87 7.463 3.644 8.158 4.236 7.729 4.827 8.158 4.601 7.463z"></path><path fill="#fff" d="M7.58 7.463L8.172 7.033 7.441 7.033 7.215 6.338 6.989 7.033 6.258 7.033 6.849 7.463 6.623 8.158 7.215 7.729 7.806 8.158 7.58 7.463z"></path><path fill="#fff" d="M10.56 7.463L11.151 7.033 10.42 7.033 10.194 6.338 9.968 7.033 9.237 7.033 9.828 7.463 9.603 8.158 10.194 7.729 10.785 8.158 10.56 7.463z"></path><path fill="#fff" d="M6.066 9.283L6.658 8.854 5.927 8.854 5.701 8.158 5.475 8.854 4.744 8.854 5.335 9.283 5.109 9.979 5.701 9.549 6.292 9.979 6.066 9.283z"></path><path fill="#fff" d="M9.046 9.283L9.637 8.854 8.906 8.854 8.68 8.158 8.454 8.854 7.723 8.854 8.314 9.283 8.089 9.979 8.68 9.549 9.271 9.979 9.046 9.283z"></path><path fill="#fff" d="M12.025 9.283L12.616 8.854 11.885 8.854 11.659 8.158 11.433 8.854 10.702 8.854 11.294 9.283 11.068 9.979 11.659 9.549 12.251 9.979 12.025 9.283z"></path><path fill="#fff" d="M6.066 12.924L6.658 12.494 5.927 12.494 5.701 11.799 5.475 12.494 4.744 12.494 5.335 12.924 5.109 13.619 5.701 13.19 6.292 13.619 6.066 12.924z"></path><path fill="#fff" d="M9.046 12.924L9.637 12.494 8.906 12.494 8.68 11.799 8.454 12.494 7.723 12.494 8.314 12.924 8.089 13.619 8.68 13.19 9.271 13.619 9.046 12.924z"></path><path fill="#fff" d="M12.025 12.924L12.616 12.494 11.885 12.494 11.659 11.799 11.433 12.494 10.702 12.494 11.294 12.924 11.068 13.619 11.659 13.19 12.251 13.619 12.025 12.924z"></path><path fill="#fff" d="M13.539 7.463L14.13 7.033 13.399 7.033 13.173 6.338 12.947 7.033 12.216 7.033 12.808 7.463 12.582 8.158 13.173 7.729 13.765 8.158 13.539 7.463z"></path><path fill="#fff" d="M4.601 11.104L5.193 10.674 4.462 10.674 4.236 9.979 4.01 10.674 3.279 10.674 3.87 11.104 3.644 11.799 4.236 11.369 4.827 11.799 4.601 11.104z"></path><path fill="#fff" d="M7.58 11.104L8.172 10.674 7.441 10.674 7.215 9.979 6.989 10.674 6.258 10.674 6.849 11.104 6.623 11.799 7.215 11.369 7.806 11.799 7.58 11.104z"></path><path fill="#fff" d="M10.56 11.104L11.151 10.674 10.42 10.674 10.194 9.979 9.968 10.674 9.237 10.674 9.828 11.104 9.603 11.799 10.194 11.369 10.785 11.799 10.56 11.104z"></path><path fill="#fff" d="M13.539 11.104L14.13 10.674 13.399 10.674 13.173 9.979 12.947 10.674 12.216 10.674 12.808 11.104 12.582 11.799 13.173 11.369 13.765 11.799 13.539 11.104z"></path><path fill="#fff" d="M4.601 14.744L5.193 14.315 4.462 14.315 4.236 13.619 4.01 14.315 3.279 14.315 3.87 14.744 3.644 15.44 4.236 15.01 4.827 15.44 4.601 14.744z"></path><path fill="#fff" d="M7.58 14.744L8.172 14.315 7.441 14.315 7.215 13.619 6.989 14.315 6.258 14.315 6.849 14.744 6.623 15.44 7.215 15.01 7.806 15.44 7.58 14.744z"></path><path fill="#fff" d="M10.56 14.744L11.151 14.315 10.42 14.315 10.194 13.619 9.968 14.315 9.237 14.315 9.828 14.744 9.603 15.44 10.194 15.01 10.785 15.44 10.56 14.744z"></path><path fill="#fff" d="M13.539 14.744L14.13 14.315 13.399 14.315 13.173 13.619 12.947 14.315 12.216 14.315 12.808 14.744 12.582 15.44 13.173 15.01 13.765 15.44 13.539 14.744z"></path></svg>,
        'ITA-R': <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#fff" d="M10 4H22V28H10z"></path><path d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#41914d"></path><path d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 26 16)" fill="#bf393b"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>,
        'POR-R': <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#459a45"></rect><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M3.472,16l12.528,8,12.528-8-12.528-8L3.472,16Z" fill="#fedf00"></path><circle cx="16" cy="16" r="5" fill="#0a2172"></circle><path d="M14,14.5c-.997,0-1.958,.149-2.873,.409-.078,.35-.126,.71-.127,1.083,.944-.315,1.951-.493,2.999-.493,2.524,0,4.816,.996,6.519,2.608,.152-.326,.276-.666,.356-1.026-1.844-1.604-4.245-2.583-6.875-2.583Z" fill="#fff"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>

      };
      return icons[code as keyof typeof icons] || <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M2.668,27.238c.658,.475,1.459,.762,2.332,.762H27c2.209,0,4-1.791,4-4v-4.857L2.668,27.238Z" fill="#357939"></path><path d="M12,4H5c-2.209,0-4,1.791-4,4V24c0,.874,.288,1.676,.764,2.334L12,4Z" fill="#0e2a69"></path><path d="M2.125,26.772L23,4H12L1.764,26.334c.111,.154,.23,.302,.362,.438Z" fill="#f7d45d"></path><path d="M2.541,27.133L31,11.125v-3.125c0-2.209-1.791-4-4-4h-4L2.125,26.772c.128,.132,.271,.247,.416,.361Z" fill="#c23635"></path><path d="M3.069,27.483l27.931-6.983V11.125L2.541,27.133c.166,.131,.342,.246,.528,.35Z" fill="#fff"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>;
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
            values.birthDate = (values.birthDate as Dayjs)?.format('YYYY-MM-DDTHH:mm:ssZ') 
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
                    <DateInput
                        label="Fecha Nacimiento"
                        name='birthDate'
                        formik={formik}
                        error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                        helperText={ (formik.touched.birthDate && formik.errors.birthDate) as string }
                    />
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
                            sx={{
                                height: '56px', // Altura fija
                                '.MuiSelect-select': {
                                  display: 'flex',
                                  alignItems: 'center',
                                  //justifyContent: 'center',
                                  gap: 1
                                }
                            }}
                            labelId="select-program"
                            id='code_program'
                            error={formik.touched.code_program && Boolean(formik.errors.code_program)}
                            name='code_program'
                            value={formik.values.code_program}
                            label="Programa"
                            onChange={formik.handleChange}
                        >
                        {
                            programs.map((program: IProgram) => (
                                <MenuItem key={program.Codigo} value={program.Codigo} sx={{display:'flex', gap:1, alignItems:'center'}}>
                                    {getIconByCode(program.Codigo)}
                                    <span>{program.Nombre}</span>
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
