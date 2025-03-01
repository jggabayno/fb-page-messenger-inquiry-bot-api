import { Request, Response } from 'express'
import { UserInterface } from '../interfaces/UserInterface'
import { getUserPersistence, createUserPersistence, updateUserPersistence } from '../persistence/userPersistence'
import { getUserInteractor, createUserInteractor, updateUserInteractor } from '../interactors/userInteractor'

export async function get(req : Request, res : Response) {

    const param = req.params?.hasOwnProperty('id') ? {id: req.params.id} : {}

    try {

        const user = await getUserInteractor({getUserPersistence}, param)

        return res.json(user)
    
    } catch (err) {
    
        return res.status(500).send('Internal Server Error')
        
    }

}

export async function post(req: Request, res: Response) {
    
    const { id, name, mobile_number, email, password, role } : UserInterface = req.body

    try {

        const newUser = await createUserInteractor({ createUserPersistence, getUserPersistence },
        { id, name, mobile_number, email, password, role }   
        )
        
        return res.status(200).json(newUser);
    
    } catch (err) {
        return res.status(409).json({errors: JSON.parse(err.message)})      
    }
}

export async function put(req: Request, res: Response) {

    const id = Number(req.params.id);
  
    const { name, mobile_number, email, password, role } : UserInterface = req.body

    try {

        const updatedUser = await updateUserInteractor({ updateUserPersistence, getUserPersistence },
            { id, name, mobile_number, email, password, role }
        )

        return res.status(200).json(updatedUser);
    
    } catch (err) {

        return res.status(409).json({errors: JSON.parse(err.message)})
        
    }
}