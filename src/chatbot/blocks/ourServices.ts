export function ourServices(psid: any, isInquirer : any, hasClosedStatus: any = true, latestInquiry : any = {}) {

    const checkLastInquiry = (isInquirer && latestInquiry?.hasOwnProperty('status')) ?  [{
        type: 'postback',
        title: 'Check Inquiry Status',
        payload: 'CHECK_LAST_INQUIRY'
    }] : []

    return [{
        attachment: {
        type: 'template',
        payload:{
            template_type:"generic",
            elements:[
                {
                    title:"Web Development",
                    image_url:`${process.env.CHATBOT_APP_URL}images/image_name.jpg`,
                    subtitle:"Web Development",
                    buttons:[
                        {
                            type: "web_url",
                            url: "https://jggabayno.vercel.app/",
                            title:"Learn more"
                         }              
                    ] 
                },
                {
                    title:"Mobile App Development",
                    image_url:`${process.env.CHATBOT_APP_URL}images/image_name.jpg`,
                    subtitle:"Mobile App Development",
                    buttons:[
                        {
                            type: "web_url",
                            url: "https://jggabayno.vercel.app/",
                            title:"Learn more"
                         }              
                    ] 
                },
                {
                    title:"Dev Ops",
                    image_url: `${process.env.CHATBOT_APP_URL}images/image_name.png`,
                    subtitle:"Dev Ops",
                    buttons:[
                        {
                            type: "web_url",
                            url: "https://jggabayno.vercel.app/",
                            title:"Learn more"
                        }              
                    ]   
                },
                {
                    title:"Software Development",
                    image_url: `${process.env.CHATBOT_APP_URL}images/image_name.jpg`,
                    subtitle:"I develop and provide software solutions",
                    buttons:[
                        hasClosedStatus
                        ?
                        {
                            type:"web_url",
                            title:"Inquire",
                            url: `${process.env.CLIENT_ORIGIN}/inquiry-form/${psid}`
                        }
                        :
                        {
                            type: 'postback',
                            title: 'Check my Inquiry Status',
                            payload: 'CHECK_LAST_INQUIRY'
                        }
                        // ,...checkLastInquiry  
                    ]
                },
                {
                    title:"Other Question or Concern",
                    image_url: `${process.env.CHATBOT_APP_URL}images/image_name.jpg`,
                    subtitle:"",
                    buttons:[
                       {
                          "type":"postback",
                          "title":"Live Chat",
                          "payload": "TALK"
                        }              
                    ]    
                }
            ]
            }
        }
        }
    ]
}