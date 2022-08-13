export interface Userasync {
    customClaims:{
        admin:boolean,
        superAdmin:boolean,
    },
    email:string
    emailVerified:boolean
    disabled:boolean,
     displayName:string,
     metadata:{}
     photoURL:string
     uid:string
}

