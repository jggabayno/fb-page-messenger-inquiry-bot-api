import {AuthEntity} from '../entities/AuthEntity'
import { createToken } from '../services/jwt'
import bcrypt from 'bcryptjs'

export async function loginInteractor({ getUserPersistence } : any, credential : any) {

    const user : any = new AuthEntity(credential)
   
    await user.validate()

    const dbUser : any = await getUserPersistence({email: user.email})

    if (!dbUser.hasOwnProperty('id')) {
        throw Error('Invalid Credential')
    }

    const isAuthenticated = await bcrypt.compare(user.password, dbUser.password)

    if (!isAuthenticated) {
        throw Error('Invalid Credential')
    }

    const token = createToken(dbUser.id)
 
    return {
        token,
        user: {
            id: dbUser.id,
            name: dbUser.name,
            type: dbUser.type
        }
    }
          
}
 