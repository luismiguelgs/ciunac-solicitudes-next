import { Icertificado } from "@/interfaces/certificado.interface"
import CertificadosService from "@/services/certificados.service"
import { Card, CardContent, Divider,  Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

async function getCertificate(id:string) {
    const resData = await CertificadosService.selectItem(id)
    //const { modificado, creado, ...newObj} = resData as Icertificado
    return resData
}

async function getCertificateDetail(id:string) {
    const resDetail = await CertificadosService.fetchItemsDetail(id)
    const sortedData = resDetail.sort((a,b)=>{
		const aNumber = parseInt(a.curso.match(/\d+$/)?.[0] || '0');
  		const bNumber = parseInt(b.curso.match(/\d+$/)?.[0] || '0');
		return aNumber - bNumber;
	});
    return sortedData
}

export default async function GetCertificatePage({params}:{params:{id:string}}) 
{
    const certificate = await getCertificate(params.id) as Icertificado
    const certificateDetail = await getCertificateDetail(params.id)


    return (
        <Grid 
            container 
            spacing={2} 
            justifyContent="center" 
            sx={{ padding: { xs: 0.5, sm: 1 } }}
        >
            {/* Certificate General Information */}
            <Grid size={{xs: 12, sm: 10, md:6}}>
                <Card 
                    variant="outlined" 
                    sx={{
                        boxShadow: 3, 
                        borderRadius: 2, 
                        padding: 1, 
                        backgroundColor: "background.paper",
                    }}
                >
                    <CardContent>
                        <Typography 
                            variant="h5" 
                            component="div" 
                            gutterBottom 
                            sx={{ textAlign: { xs: "center", md: "left" } }}
                        >
                            {certificate?.alumno}
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                        <Typography variant="body1" sx={{ marginBottom: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                            <strong>Idioma:</strong> {certificateDetail[0].curso.split(" ")[0]}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                            <strong>N°Horas:</strong> {certificate?.horas}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                            <strong>N°Registro:</strong> {certificate?.numero_registro}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                            <strong>Fecha de Emisión:</strong> {new Date(certificate?.fecha_emision ?? '').toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                            <strong>Fecha de Conclusión:</strong> {new Date(certificate?.fecha_conclusion ?? '').toLocaleDateString()}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Certificate Detailed Information */}
            <Grid size={{xs: 12, sm: 10, md:6}}>
                <Card 
                    variant="outlined" 
                    sx={{
                        boxShadow: 3, 
                        borderRadius: 2, 
                        padding: 1, 
                        backgroundColor: "background.paper",
                    }}
                >
                    <CardContent>
                        <Typography 
                            variant="h5" 
                            component="div" 
                            gutterBottom 
                            sx={{ textAlign: { xs: "center", md: "left" } }}
                        >
                            NIVEL {certificateDetail[0].curso.split(" ")[1]}
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                        <TableContainer component={Paper} sx={{ backgroundColor: "#ffffff", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)" }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#4A90E2" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>CURSO</TableCell>
                                        <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>CICLO</TableCell>
                                        <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>NOTAS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        certificateDetail.map((item,index)=>(
                                            <TableRow 
                                                key={index}
                                                sx={{ 
                                                    "&:nth-of-type(odd)": { backgroundColor: "#F5F5F5" },
                                                    "&:nth-of-type(even)": { backgroundColor: "#FFFFFF" },
                                                }}
                                                >
                                                <TableCell>{item.curso}</TableCell>
                                                <TableCell>{`${item.ciclo} ${item.modalidad}` }</TableCell>
                                                <TableCell>{item.nota}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
