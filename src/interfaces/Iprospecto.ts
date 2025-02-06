export default interface Iprospecto {
    id?: string,
    dni: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    facultad: string,
    email: string,
    codigo?: string,
    trabajador: boolean,
    alumno_ciunac: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    creado?: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modificado?: any,
}