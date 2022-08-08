import { Timestamp } from "firebase/firestore"

export interface Login {
    comentario:string,
    url:string
    dataCad?: Timestamp

}
