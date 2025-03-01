import {Request, Response} from 'express'

import { getUserPersistence } from '../persistence/userPersistence'
import { loginInteractor } from '../interactors/authInteractor'

export async function login(req : Request, res : Response) {

    try {

        const user = await loginInteractor({getUserPersistence}, req.body)

        return res.status(200).json(user)
    
    } catch (err) {

        return res.status(409).json({message: err.message})
        
    }
}