export function greeting(fb: any, hasGreeting: any = true) {

    const doYouWantToKnowMore = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: 'Do you want to know more?',
                buttons: [
                    {
                        type: 'postback',
                        title: 'Who we are',
                        payload: 'ABOUT_US',
                    },
                    {
                        type: 'postback',
                        title: 'What we do',
                        payload: 'OUR_SERVICES',
                    }
                ]
            }
        }
    }

    const greetingText : any = hasGreeting ? [{ text: `Hi ${fb.first_name}, Welcome to the JGGabayno Page! 😊`}] : {}

    return [
       ...greetingText,
        doYouWantToKnowMore
    ]
}