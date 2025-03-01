import { Request, Response } from 'express'

import inquiryStatuses from '../constant/inquiryStatus'

import { InquiryInterface } from '../interfaces/InquiryInterface'

import { getUserPersistence } from '../persistence/userPersistence'
import { getUserInteractor } from '../interactors/userInteractor'
import { getInquiryPersistence } from '../persistence/inquiryPersistence'
import { getInquiryInteractor } from '../interactors/inquiryInteractor'

export async function get(req : Request, res : Response) {

    try {

        const users : any = await getUserInteractor({getUserPersistence})
        const inquiries : any = await getInquiryInteractor({getInquiryPersistence})

        const returnedData = {
            total_inquirer: users?.filter((user: any) => user.role !== 1)?.length,
            total_inquiries: inquiries?.length,
            inquiry_statuses: [
                {
                    slug: 'Pending',
                    count: inquiries.filter((inquiry : InquiryInterface) => inquiry.status === inquiryStatuses.pending)?.length
                },
                {
                    slug: 'Assigned',
                    count: inquiries.filter((inquiry : InquiryInterface) => inquiry.status === inquiryStatuses.assigned)?.length
                },
                {
                    slug: 'Call Back',
                    count: inquiries.filter((inquiry : InquiryInterface) => inquiry.status === inquiryStatuses.call_back)?.length
                },
                {
                    slug: 'Closed',
                    count: inquiries.filter((inquiry : InquiryInterface) => inquiry.status === inquiryStatuses.closed)?.length
                }
            ]
        }

        return res.status(200).json(returnedData);
    
    } catch (err) {
    
        return res.status(500).send('Internal Server Error')
        
    }

}