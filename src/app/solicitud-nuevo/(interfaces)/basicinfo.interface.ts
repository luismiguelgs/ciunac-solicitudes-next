import { DocumentType, Gender } from "@/libs/constants";

export default interface Ibasicinfo
{
    firstLastname: string,
    secondLastname: string,
    firstName: string,
    secondName?: string
    document_type: DocumentType,
    document: string,
    gender: Gender,
    birthDate: any,
    phone: string,
    code_program: string
}