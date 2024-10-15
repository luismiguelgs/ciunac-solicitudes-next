import Process from './(components)/Process'

async function getPrograms() {
    const res = await fetch('https://api.q10.com/v1/programas?Limit=30', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Api-Key': process.env.API_KEY_Q10 || ''
        }
    })
    const data = await res.json()
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
