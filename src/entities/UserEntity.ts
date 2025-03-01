import { UserInterface } from "../interfaces/UserInterface"

export class UserEntity {
    id: number;
    role: number;
    name: string;
    email: string;
    mobile_number: string;
    password: string;
    
    constructor({id, role, name, email, mobile_number, password }: UserInterface){
        this.id = id
        this.role = role
        this.name = name
        this.email = email
        this.mobile_number = mobile_number
        this.password = password
    }

    async validate(){

        let errors = []
        
        if (!this.name) errors.push('name')
        if (!this.email) errors.push('email')
        if (!this.mobile_number) errors.push('mobile_number')
        if (!this.role) errors.push('role')

        if (errors.length){
            throw Error(JSON.stringify(errors.map(error => `${error} is required`)))
        }

    }

    async validateOnDB(getUserPersistence: any){
        
        const userDB: UserInterface = await getUserPersistence(
            {mobile_number: this.mobile_number, email: this.email}
        )

        function initiateErrors(data: UserInterface){
            let errors = []
    
            if (userDB.email === data.email) errors.push('email')
            if (userDB.mobile_number === data.mobile_number) errors.push('mobile_number')
           
            if (errors.length) throw Error(JSON.stringify(errors.map(field => ({field, message: `${field.replace('_', ' ')} already exist`}))))
        }
 
       


        const isUpdate = this.id
        const isExist = userDB.hasOwnProperty('id')
        
        if (isExist) {

            const isSameUser = (Number(userDB.id) === Number(this.id))
            
            if (isUpdate && !isSameUser) initiateErrors(this)

            if (!isUpdate) initiateErrors(this)

        }
    
    }
}