import { Request, Response } from 'express'
import { InquiryInterface } from '../interfaces/InquiryInterface'
import { getUserPersistence } from '../persistence/userPersistence'

import {
    getInquiryByIdPersistence,
    getInquiryByPlatformIdPersistence,
    getInquiryPersistence, 
    createInquiryPersistence,
    updateInquiryPersistence,
    getOwnInquiryPersistence 
} from '../persistence/inquiryPersistence'

import { 
    getByPlatformIdInteractor,
    getByUserIdInteractor, 
    getInquiryInteractor, 
    createInquiryInteractor,
    updateInquiryInteractor
} from '../interactors/inquiryInteractor'


export async function getByPlatformId(req : Request, res : Response) {
    const id: any = req.params.id
    try {
        
        const inquiries = await getByPlatformIdInteractor({ getInquiryByPlatformIdPersistence }, id)

        return res.status(200).json(inquiries)
    
    } catch (err) {

        return res.status(500).send('Internal Server Error')
        
    }
    
}


export async function getById(req : Request, res : Response) {
const id: any = req.params.id
try {

    const user = await getInquiryByIdPersistence(id)
    return res.json(user);

} catch (err) {

    return res.status(500).send('Internal Server Error')
    
}

}

export async function getByUserId(req : Request, res : Response) {
    const user_id: any = req.params.user_id

    try {
        
        const inquiries = await getByUserIdInteractor({getOwnInquiryPersistence}, user_id)
        return res.json(inquiries);
    

    } catch (err) {
        return res.status(500).send('Internal Server Error')
    }

}

export async function get(req : Request, res : Response) {

    try {

        const inquiry = await getInquiryInteractor({getInquiryPersistence})
        
        return res.json(inquiry);
    
    } catch (err) {
        
        return res.status(500).send('Internal Server Error')
        
    }

}

export async function post(req: Request, res: Response) {
    
    const { user_id, platform_id, company_name, designation, description, status } : InquiryInterface = req.body
 
    try {

        const newInquiry = await createInquiryInteractor(
            { createInquiryPersistence, getOwnInquiryPersistence, getUserPersistence, getInquiryByIdPersistence },
            { user_id, platform_id, company_name, designation, description, status }
        )

        return res.status(200).json(newInquiry)
    
    } catch (err) {
 
        return res.status(409).json({errors: JSON.parse(err.message)})
    }
}

export async function put(req: Request, res: Response) {

    const id = req.params.id;

    const { user_id, platform_id, company_name, designation, description, status } : InquiryInterface = req.body

    try {

        const updatedInquiry = await updateInquiryInteractor(
            { updateInquiryPersistence, getOwnInquiryPersistence, getUserPersistence, getInquiryByIdPersistence },
            { id, user_id, platform_id, company_name, designation, description, status }
        )

        return res.status(200).json(updatedInquiry)
        
    } catch (err) {

        return res.status(409).json({errors: JSON.parse(err.message)})
        
    }
}