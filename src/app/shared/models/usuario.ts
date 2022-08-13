import { Timestamp } from "firebase/firestore"


export interface Usuario {
    nome:string
    nickName?:string
    telefone?:string,
    email:string,
    senha:string,
    dataNasci: Timestamp,
    dataCad?: Timestamp,
    foto?:File,
    uid?:string

}
