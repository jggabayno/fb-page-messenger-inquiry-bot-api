import {InquiryInterface} from '../interfaces/InquiryInterface'
import {InquiryEntity} from '../entities/InquiryEntity'

export async function getByPlatformIdInteractor({ getInquiryByPlatformIdPersistence } : any, platform_id : number) {
   
    const inquiries: InquiryInterface = await getInquiryByPlatformIdPersistence(platform_id)
 
    return inquiries;

}

export async function getByUserIdInteractor({ getOwnInquiryPersistence } : any, param : any = 0) {
   
    const inquiryDB: InquiryInterface = await getOwnInquiryPersistence(param)
 
    return inquiryDB;

}

export async function getInquiryInteractor({ getInquiryPersistence } : any) {
   
    const inquiryDB: InquiryInterface = await getInquiryPersistence()
 
    return inquiryDB;

}

export async function createInquiryInteractor(
    { createInquiryPersistence, getOwnInquiryPersistence, getUserPersistence, getInquiryByIdPersistence } : any,
    {id, user_id, platform_id, company_name, designation, description, status } : any) {
 
    const inquiry : any = new InquiryEntity({id, user_id, platform_id, company_name, designation, description, status })
   
    await inquiry.validate()
    await inquiry.validateOnDB({getOwnInquiryPersistence, getUserPersistence, getInquiryByIdPersistence})

    const newInquiry = await createInquiryPersistence(inquiry)

    return newInquiry;

}

export async function updateInquiryInteractor(
    { updateInquiryPersistence, getOwnInquiryPersistence, getUserPersistence, getInquiryByIdPersistence } : any,
    {id, user_id, platform_id, company_name, designation, description, status } : any) {
    
    const inquiry : any = new InquiryEntity({id, user_id, platform_id, company_name, designation, description, status })

    await inquiry.validate();
    await inquiry.validateOnDB({getOwnInquiryPersistence, getUserPersistence, getInquiryByIdPersistence})

    const updatedInquiry = await updateInquiryPersistence(inquiry)

    return updatedInquiry;

}