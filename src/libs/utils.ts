import { Timestamp } from "firebase/firestore";

export function formatDateDDMMYYYY(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export function obtenerPeriodo()
{
    const fechaActual = new Date();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1 para obtener el mes actual
    const año = fechaActual.getFullYear();

    // Formatear los valores para que tengan dos dígitos si es necesario
    const mesFormateado = String(mes).padStart(2, '0');

    return `${String(año)}${mesFormateado}`
}

export const changeDate = (date:Timestamp, hora=true):string|undefined => {
    if(date === null) return
    const fecha:Date  = date?.toDate()
    // Obtener diferentes partes de la fecha y hora
    if(!fecha) return ''
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, se suma 1
    const anio = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();
    
    // Formatear los valores para que tengan dos dígitos si es necesario
    
    const diaFormateado = String(dia).padStart(2, '0');
    const mesFormateado = String(mes).padStart(2, '0');
    if(hora){
      const horasFormateadas = String(horas).padStart(2, '0');
      const minutosFormateados = String(minutos).padStart(2, '0');
      const segundosFormateados = String(segundos).padStart(2, '0');
      // Generar la cadena con el formato deseado (por ejemplo, dd/mm/aaaa hh:mm:ss)
      const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio} ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
      return fechaFormateada
    }else{
      // Generar la cadena con el formato deseado (por ejemplo, dd/mm/aaaa hh:mm:ss)
      const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;
      return fechaFormateada
    }
} 

export function getFileExtension(url: string): string | null {
	const match = url.match(/\.([a-zA-Z0-9]+)(?=\?|$)/);
	return match ? match[1] : null;
}

export function getMonthName(fecha:Date): string {
    const opciones: Intl.DateTimeFormatOptions = { month: 'long' };
    return fecha.toLocaleString('es-ES', opciones); // 'es-ES' para español
}