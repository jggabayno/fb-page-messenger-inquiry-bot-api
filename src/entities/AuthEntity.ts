export class AuthEntity {
    email: string;
    password: string;
 
    constructor(credential: CredentialInterface){
        this.email = credential.email;
        this.password = credential.password;
    }

    validate(){
       
        if (!this.email && !this.password) {
            throw Error('Email and Password is required')
        }
        
        if (!this.email) {
            throw Error('Email is required')
        }
        
        if (!this.password) {
            throw Error('Password is required')
        }

    }
}