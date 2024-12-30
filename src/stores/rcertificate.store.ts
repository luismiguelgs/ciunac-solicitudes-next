import { create } from "zustand";

export interface FormDataCertificate {
    verifyData?: {
        dni: string;
        trabajador: boolean;
        antiguo: boolean;
        email: string;
        tipo_solicitud: string;
        alumno_ciunac: boolean;
    }
    basicData?: {
        apellidos: string;
        nombres: string;
        idioma: string;
        nivel: string;
        alumno: boolean;
        celular: string;
        facultad: string;
        codigo: string;
    };
    finData?: {
        pago: number;
        numero_voucher: string;
        fecha_pago: string;
        img_voucher: string;
    };
    documents?: {
        img_cert_trabajo: string;
        img_cert_estudio: string;
    };
}

interface FormStore {
  formData: FormDataCertificate;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateFormData: (step: keyof FormDataCertificate, values: any) => void;
}

const useFormStore = create<FormStore>((set) => ({
	formData: {},
	updateFormData: (step, values) =>
		set((state) => ({
		formData: { ...state.formData, [step]: values },
		})),
}));

export default useFormStore;