import type { Metadata } from "next";
import "../globals.css";
import { Box } from "@mui/material";
import { MyAppBar } from "@/components/mui";

export const metadata: Metadata = {
    title: "Solicitud de Examen de Ubicación",
    description: "Generated by create next app",
};

export default function UbicationLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <Box sx={{flexGrow: 1}}>
            <MyAppBar title="SOLICITUD - EXAMEN DE UBICACIÓN"/>
            {children}
        </Box>  
    );
}
