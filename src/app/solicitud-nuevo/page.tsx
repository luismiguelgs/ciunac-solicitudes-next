import Process from './(components)/Process'
import IProgram from './(interfaces)/programs.interface'

async function getPrograms():Promise<IProgram[]> {
    const res = await fetch('https://api.q10.com/v1/programas?Limit=30', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Api-Key': process.env.API_KEY_Q10 || ''
        }
    })
    let data:IProgram[] = await res.json()
    
    data = data.filter((program:IProgram) => program.Numero_resolucion === null)
    return data
}

export default async function NewStudentPage() 
{
    const programs = await getPrograms()

    return (
        <>
            <Process programs={programs} />
        </>
    )
}
