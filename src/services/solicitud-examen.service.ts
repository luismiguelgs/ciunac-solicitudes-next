import { firestore } from '@/libs/firebase';
import { collection, query, where, getDocs ,serverTimestamp, addDoc, doc, getDoc, orderBy} from 'firebase/firestore'
import IsolUbicacion from '@/interfaces/IsolUbicacion';
import { changeDate, obtenerPeriodo } from '@/libs/utils';
import { Iexamen, IexamenNotas } from '@/interfaces/examen.interface';

export default class SolicitudesExamenService
{
    private static db = collection(firestore, 'solicitudes')
    private static db_prospectos = collection(firestore, 'prospectos')
    private static db_examenes = collection(firestore, 'examenes')
    private static db_notas = collection(firestore, 'notas_ubicacion')


    public static async getUbication(dni:string):Promise<IsolUbicacion[]>
    {
        try {
            const q = query(this.db,
                where('dni', '==', dni),
                where('solicitud', '==', 'EXAMEN_DE_UBICACION'),
                orderBy('creado', 'desc')
            )
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map((doc) => {
                const data = doc.data() as IsolUbicacion;
                return {
                    ...data,
                    id: doc.id,
                };
            });

        } catch (error) {
            console.error(error);
            throw error
        }
    }

    public static async getItem(dni:string, ubication=false)
    {
        try{
            const conditions = [where('dni', '==', dni)];

            if (ubication) {
                conditions.push(
                    where('estado', '!=', 'ENTREGADO'),
                    where('solicitud', '==', 'EXAMEN_DE_UBICACION')
                );
            }

            const q = query(
                this.db,
                ...conditions,
                orderBy('creado', 'desc')
            );

            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map((doc) => ({
                ...doc.data(), // Evitar sobrescritura de 'id'
                id: doc.id,    // Solo se agrega si no existe
            }));
        }
        catch(err){
            console.error(err);
            throw err
        }
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
            nombres: data.nombres.toLocaleUpperCase().trim(),
            apellidos: data.apellidos.toLocaleUpperCase().trim(),
            telefono: data.telefono.trim(),
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
                apellidos: data.apellidos.toLocaleUpperCase().trim(),
                nombres: data.nombres.toLocaleUpperCase().trim(),
                periodo : obtenerPeriodo(),
                estado:'NUEVO',
                dni:data.dni,
                pago:+data.pago,
                idioma:data.idioma,
                tipo_trabajador: data.tipo_trabajador,
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
    //Examenes - funciones ****************************************
    public static async fetchItems():Promise<Iexamen[]>{
        try{
            const snapShot = await getDocs(this.db_examenes)
            const data = snapShot.docs.map((item)=>{
                return{
                    ...item.data(),
                    id: item.id,
                    fecha_examen: item.data().fecha_examen ? new Date(item.data().fecha_examen.seconds * 1000) : null,
                    fecha_final: item.data().fecha_final ? new Date(item.data().fecha_final.seconds * 1000) : null,
                    creado: item.data().creado ? changeDate(item.data().creado) : null,
                    modificado: item.data().modificado ? changeDate(item.data().modificado) : null
                } as Iexamen
            })
            return data
        }
        catch(err){
            if (err instanceof Error) {
                console.error('Error al actualizar el elemento:', err.message);
            } else {
                console.error('Error desconocido al actualizar el elemento:', err);
            }
            throw err
        }
    }
    //Calificaciones Detalle - funciones ************************
    public static async fetchItemsDetail(dni: string):Promise<IexamenNotas[]>
    {
        console.info('fetchItemsDetail', dni)
        try{
            const q = query(this.db_notas,where('dni','==',dni))
            const snapShot = await getDocs(q)
            
            const data = snapShot.docs.map((item)=>{
                return{
                    ...item.data(),
                    id: item.id,
                } as IexamenNotas
            })
            return data
        }
        catch(err){
            if (err instanceof Error) {
                console.error('Error al actualizar el elemento:', err.message);
            } else {
                console.error('Error desconocido al actualizar el elemento:', err);
            }
            throw err
        }
    }
}
