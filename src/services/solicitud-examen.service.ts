import { firestore } from '@/libs/firebase';
import { collection, query, where, getDocs ,serverTimestamp, addDoc, doc, getDoc, orderBy} from 'firebase/firestore'
import IsolUbicacion from '@/interfaces/IsolUbicacion';
import { changeDate, obtenerPeriodo } from '@/libs/utils';

export default class SolicitudesExamenService
{
    private static db = collection(firestore, 'solicitudes')
    private static db_prospectos = collection(firestore, 'prospectos')

    public static async getItem(dni:string)
    {
        const q = query(
            this.db,
            where('dni','==',dni) , 
            orderBy('creado','desc')
        )
        // Obtenemos los documentos que cumplen la consulta
        const  querySnapshot = await getDocs(q)

        // Devolvemos un array con los datos de los documentos, incluyendo el ID
        return querySnapshot.docs.map((doc) => {
            const data = doc.data();
            // Agregamos el campo 'id' al objeto data
            data.id = doc.id;
            return data;
        });
    }
    public static async fetchRecord(idioma:string,nivel:string,dni:string,solicitud:string){
        const q = query(
            this.db,
            where('dni','==',dni),
            where("idioma","==",idioma),
            where("nivel","==",nivel),
            where('solicitud','==',solicitud),
            where('estado','!=','ENTREGADO')
        )
        // Obtenemos los documentos que cumplen la consulta
        const querySnapshot = await getDocs(q)
    
        // Devolvemos un array con los datos de los documentos, incluyendo el ID
        return querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // Agregamos el campo 'id' al objeto data
          data.id = doc.id;
          return data;
        });
    }
    public static async newItem(data:IsolUbicacion):Promise<string>
    {
        const dataProspecto = {
            dni: data.dni,
            nombres: data.nombres,
            apellidos: data.apellidos,
            telefono: data.telefono,
            facultad : data.facultad,
            email: data.email,
            codigo: data.codigo || '',
            trabajador : data.trabajador,
            alumno_ciunac : data.alumno_ciunac,
            creado: serverTimestamp(),
            modificado : serverTimestamp()
        }
        
        let docRef = null
        try{
			console.log(dataProspecto);
			
          	docRef = await addDoc(this.db_prospectos, dataProspecto)
        }catch(err){
          console.log(err);
        }
        let newID = null

        if(docRef) newID = docRef.id;
        if(docRef){
            const dataSolicitud = {
                solicitud: data.tipo_solicitud,
                apellidos: data.apellidos,
                nombres: data.nombres,
                periodo : obtenerPeriodo(),
                estado:'NUEVO',
                dni:data.dni,
                pago:+data.pago,
                idioma:data.idioma,
                nivel:data.nivel,
                img_dni: data.img_dni,
                img_cert_trabajo: data.trabajador ? data.img_cert_trabajo : '',
                img_cert_estudio: data.alumno_ciunac ? data.img_cert_estudio : '',
                img_voucher: data.img_voucher,
                numero_voucher:data.numero_voucher,
                fecha_pago: data.fecha_pago,
                manual:false,
		        trabajador: data.trabajador,
                alumno_id: newID,
                creado:serverTimestamp(),
                modificado:serverTimestamp()
            }
            console.log(dataSolicitud);
		
            try{
              const docRef1 = await addDoc(this.db, dataSolicitud)
              return docRef1.id         
            }catch(err){
              console.log(err);
            }            
        } 
        return ''
    }
	public static async getItemId(id:string){
		const docRef = doc(this.db, id)
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			return { ...docSnap.data(), id:docSnap.id, creado:changeDate(docSnap.data().creado) }
		} else {
			console.log("No such document!");
			return null
		}
	}
}
