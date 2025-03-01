import { sendApi } from './services/fbGraphAPI'
import * as blocks from './blocks/index'
import { getInquirerByPlatformId } from './services/clientAPI'
import inquiryMessage from '../chatbot/services/inquiryMessage'
import { InquiryEntity } from '../entities/InquiryEntity'

import makeNodeStorage from './services/nodeStorage'
import { InquiryInterface } from '../interfaces/InquiryInterface'

const storage = makeNodeStorage()

async function begin(user : FacebookGraphUserInterface, hasGreeting : boolean = true) {
 
    const inquiries = await getInquirerByPlatformId(user.id)
    const isInquirer = inquiries?.length !== 0

    if (isInquirer){

        const latestInquiry : InquiryInterface = inquiries.reduce((acc: any, cur: any) => cur.created_at > acc.created_at ? acc : cur)
        const hasClosedStatus = inquiries.some((inquiry: InquiryEntity) => inquiry.status === 4)    

        sendApi(user.id, blocks.ourServices(user.id, isInquirer, hasClosedStatus, latestInquiry)) 

    }

    if (!isInquirer) {

        sendApi(user.id, blocks.greeting(user, hasGreeting))

    }


}

export async function typed(user : FacebookGraphUserInterface, received_message : string) {
    
    if(received_message){
        
        const isLiveChat = storage.isLiveChat(user.id)

        if(isLiveChat) {

            if (received_message === 'END_TALK') {
                storage.setLiveChat(user.id, false)
                return begin(user)
            }

        }
    
        if(!isLiveChat) {
    
            storage.setPrevious(user.id, { ...storage.getPrevious(user.id), received_message })

        }

    }

}

export async function clicked(user : FacebookGraphUserInterface, received_payload : string) {

    if(received_payload){

        const isLiveChat = storage.isLiveChat(user.id)

        if (isLiveChat) {
    
            if (!['TALK', 'DISCARD_END_TALK', 'END_TALK'].includes(received_payload)) {
    
                if (storage.getPrevious(user.id).received_payload !== received_payload) {
    
                    sendApi(user.id, blocks.liveChatDef())
                }
            }

            if (received_payload === 'DISCARD_END_TALK') {
               sendApi(user.id, blocks.liveChatGreeting(user.first_name, true))
            }
            
            if (received_payload === 'END_TALK') {
                storage.setLiveChat(user.id, false)
                return begin(user)
            }
        }

        if (!isLiveChat) {

            if(received_payload === 'GET_STARTED') begin(user)
            if(received_payload === 'RESTART_BOT') begin(user)
            if(received_payload === 'GO_BACK') begin(user, false)
            if(received_payload === 'ABOUT_US') sendApi(user.id, blocks.aboutUs())
            if(received_payload === 'OUR_SERVICES') {
    
                const inquiries = await getInquirerByPlatformId(user.id)
                const isInquirer = inquiries?.length !== 0
                
                if (isInquirer) {
    
                    const latestInquiry = inquiries?.reduce((acc:any, cur:any) => cur.created_at > acc.created_at ? acc : cur)
                    const hasClosedStatus = inquiries?.some((inquiry: any) => inquiry.status === 4)
                
                    sendApi(user.id, blocks.ourServices(user.id, isInquirer, hasClosedStatus, latestInquiry))
                    
                } else {
    
                    sendApi(user.id, blocks.ourServices(user.id, isInquirer))
    
                }
    
            }
            if(received_payload === 'CHECK_LAST_INQUIRY') {
    
                const inquiries = await getInquirerByPlatformId(user.id)
                const latestInquiry = inquiries?.reduce((acc:any, cur:any) => cur.created_at > acc.created_at ? acc : cur)
    
                sendApi(user.id, [
                    {
                        text: inquiryMessage(latestInquiry.status)
                    },
                    ...blocks.greeting(user, false)
                ])
            }
            
            if(received_payload === 'TALK') {
    
                const name = storage.getUser(user.id)?.hasOwnProperty('name')
                ?  storage.getUser(user.id).name : user.first_name

                storage.setLiveChat(user.id, true)

                sendApi(user.id, [...blocks.liveChatGreeting(name), {
                    text: 'To end Live Chat just type END_TALK'
                }])
                
            }
    
            storage.setPrevious(user.id, { ...storage.getPrevious(user.id), received_payload })
 
        }


    }

}



















// {
//     text: `Your information:\n\nName: ${name}\nMobile Number: ${mobile_number}\nEmail: ${email}\nCompany Name: ${company_name}\nDesignation: ${designation}\nMessage: ${description}`
// },