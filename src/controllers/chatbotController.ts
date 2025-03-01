import { Request, Response } from 'express'
import { HandoverInterface } from 'src/interfaces/HandoverInterface'
import { getUser, getStarted } from '../chatbot/services/fbGraphAPI'
import { typed, clicked } from '../chatbot/responses'

async function handover({ message, postback, sender } : HandoverInterface) {
    return await getUser(sender.id).then((data) => {
        if (data) {
            const isUserTyped = !message?.hasOwnProperty('quick_reply')
            if (isUserTyped) typed(data, message?.text)
            if (postback || !isUserTyped) clicked(data, postback?.payload || message?.quick_reply?.payload)
        }
    })
}

export function post(req:Request, res:Response) {

    const webhook_events = req.body.entry[0]

    const isNotfound = req.body.object !== 'page'

    if (isNotfound) res.sendStatus(404)

    if (webhook_events.messaging) {
        webhook_events.messaging.forEach(({ message, postback, sender } : any) => handover({ message, postback, sender }))
    }

    res.status(200).send('EVENT_RECEIVED')

}

export function get(req:Request, res:Response) {

    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode && token) {

        if (mode !== 'subscribe' && token !== process.env.CHATBOT_VERIFY_TOKEN) {
            res.sendStatus(403)
        }

        getStarted(res, challenge)
    }
}