import { Request, Response } from 'express';
import { getInquiryPersistence } from '../persistence/inquiryPersistence';
import { getInquiryInteractor } from '../interactors/inquiryInteractor';
import { sendApi } from '../chatbot/services/fbGraphAPI';
import { InquiryInterface } from 'src/interfaces/InquiryInterface';

export async function post(req : Request, res : Response) {

    const { message } : any = req.body
 
    try {

        const inquiries : any = await getInquiryInteractor({getInquiryPersistence})

        const uniqueUsersPSID : any = [...new Set(inquiries.filter((inquiry : InquiryInterface) => inquiry.platform_id !== null)
            .map((inquiry : InquiryInterface) => inquiry.platform_id))]

        uniqueUsersPSID.forEach((platform_id: any) => {
            if(platform_id) sendApi(platform_id, [{text: message}])
        })

        return res.status(200).send('All Inquirer Successfully Re-engaged')

    } catch (err) {
    
        return res.status(500).send('Internal Server Error')
        
    }

}