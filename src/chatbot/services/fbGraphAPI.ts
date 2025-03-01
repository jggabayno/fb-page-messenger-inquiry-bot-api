import axios from 'axios'

const headers = {
    'Content-Type': 'application/json',
}

async function getStarted(res : any, challenge : any) {

    const params = {
        get_started: {
            payload: "GET_STARTED"
        },
        whitelisted_domains: [process.env.CHATBOT_APP_URL]
    }
    
    const response = await axios.post(`${process.env.CHATBOT_FB_GRAPH_URL}/v11.0/me/messenger_profile?access_token=${process.env.CHATBOT_PAGE_ACCESS_TOKEN}`, params, { headers })

    if (response) res.send(challenge)
}

async function sendApi(sender_psid : any, response : any, messaging_type = true) {

    async function recurseGetResponse(index : any) {

        const hasResponse = await sendResponse(sender_psid, response[index])

        if (hasResponse) {
            index++
            if (index < response.length) recurseGetResponse(index)
        }

    }

    await recurseGetResponse(0)

    async function sendResponse(sender_psid : any, message : any) {

        const isReEngage : any =  true // messaging_type === "MESSAGE_TAG"

        const params = isReEngage ? { recipient: { id: sender_psid, }, messaging_type: "MESSAGE_TAG", tag: "CONFIRMED_EVENT_UPDATE", message } : { recipient: { id: sender_psid, }, message }

        return await axios.post(`${process.env.CHATBOT_FB_GRAPH_URL}/v11.0/me/messages?access_token=${process.env.CHATBOT_PAGE_ACCESS_TOKEN}`, params)
    }
}

async function getUser(sender_psid : any) {
   try {
    const response = await axios.get(`${process.env.CHATBOT_FB_GRAPH_URL}/${sender_psid}?fields=first_name,name&access_token=${process.env.CHATBOT_PAGE_ACCESS_TOKEN}`)
    const data = await response.data
    return data
   } catch(error) {

   }
}

export { getStarted, getUser, sendApi }