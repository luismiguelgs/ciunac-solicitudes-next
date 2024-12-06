import Isolicitud from '@/interfaces/solicitud.interface';
import { create } from 'zustand';

interface StoreState{
    request: Isolicitud;
    setRequest: (field: keyof Isolicitud, value: unknown) => void;
}

const useStoreRequest = create<StoreState>((set) => ({
    request: {
        tipo_solicitud: '',
        antiguo: false,
        apellidos: '',
        nombres: '',
        celular: '',
        certificado_trabajo: '',
        img_cert_estudio: '',
        codigo: '',
        dni: '',
        email: '',
        idioma: '',
        nivel: '',
        numero_voucher: '',
        facultad: '',
        fecha_pago: '',
        trabajador: false,
        voucher: '',
        estado: '',
        pago: 0,
        creado: ''
    },
    setRequest: (field: keyof Isolicitud, value: unknown) => {
        set((state) => ({
            request: {
                ...state.request,
                [field]: value
            }
        }));
    }
}));
export default useStoreRequest;