import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';

const cards = [
	{ 
		title: 'Solicitud de Certificados', 
		image: 'https://images.pexels.com/photos/27001883/pexels-photo-27001883/free-photo-of-ciudad-carretera-trafico-gente.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
		link: '/solicitud-certificados' 
	},
	{ 
		title: 'Solicitud de Examen de Ubicación', 
		image: 'https://images.pexels.com/photos/7377687/pexels-photo-7377687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
		link: '/solicitud-ubicacion' 
	},
	{ 
		title: 'Consulta Estado de Solicitud', 
		image: 'https://images.pexels.com/photos/19593823/pexels-photo-19593823/free-photo-of-paisaje-naturaleza-nubes-bosque.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
		link: '/consulta-solicitud' 
	},
	{ 
		title: 'Consulta de Certificado', 
		image: 'https://images.pexels.com/photos/14035701/pexels-photo-14035701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
		link: '/consulta-certificado'
	},
	{ 
		title: 'Solicitud alumno nuevo', 
		image: 'https://images.pexels.com/photos/7175572/pexels-photo-7175572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
		link: '/solicitud-nuevo'
	},
	{ 
		title: 'Consulta de Examen de Ubicación', 
		image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
		link: '/consulta-ubicacion'
	},
];

export default function HomePage() {
  	return (
		<Grid container spacing={4} p={5}>
        {cards.map((card, index) => (
            <Grid size={{xs:12, sm:6, md:3}} key={index}>
				<Card>
					<CardActionArea component={Link} href={card.link}>
					<CardMedia
						component="img"
						height="140"
						image={card.image}
						alt={card.title}
					/>
					<CardContent sx={{minHeight:120}}>
						<Typography gutterBottom variant="h5" component="div">
						{card.title}
						</Typography>
					</CardContent>
					</CardActionArea>
				</Card>
            </Grid>
        ))}
        </Grid>
	);
}
