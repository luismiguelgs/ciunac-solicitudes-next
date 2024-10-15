import { MyAppBar } from "@/components/mui";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function RequestNewStudentLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
       <Box sx={{ flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SOLICITUD - NUEVO ALUMNO
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{p: 2}}>
                {children}
            </Box>
       </Box>
    );
}