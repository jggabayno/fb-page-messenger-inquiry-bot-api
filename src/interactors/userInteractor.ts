import { UserInterface } from '../interfaces/UserInterface'
import { UserEntity } from '../entities/UserEntity'
 
export async function getUserInteractor({ getUserPersistence } : any, param: any = {}) {
   
    const userDB: UserInterface = await getUserPersistence(param)
 
    return userDB

}

export async function createUserInteractor(
    { createUserPersistence, getUserPersistence } : any, param : UserInterface) {
    
    const user = new UserEntity(param)
   
    await user.validate()
    await user.validateOnDB(getUserPersistence)
    
    const newUser = await createUserPersistence(user)
    return newUser
    
}

export async function updateUserInteractor(
    { updateUserPersistence, getUserPersistence } : any, param : UserInterface) {
    
    const user = new UserEntity(param)
   
    await user.validate()
    await user.validateOnDB(getUserPersistence)

    const updatedUser = await updateUserPersistence(user)
    return updatedUser

}