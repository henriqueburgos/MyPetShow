import { Timestamp } from "firebase/firestore"

export interface Login {
    comentario:string,
    url:string,
    responsividade:string,
    dataCad?: Timestamp
    uid?:string

}
