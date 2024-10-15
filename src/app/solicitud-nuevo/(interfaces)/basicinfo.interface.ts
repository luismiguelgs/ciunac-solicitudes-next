import { DocumentType, Gender } from "@/libs/constants";
import { Dayjs } from "dayjs";

export default interface Ibasicinfo
{
    firstLastname: string,
    secondLastname: string,
    firstName: string,
    secondName?: string
    document_type: DocumentType,
    document: string,
    gender: Gender,
    birthDate: Dayjs |string | null,
    phone: string,
    code_program: string
}