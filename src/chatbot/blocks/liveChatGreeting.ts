export function liveChatGreeting(name : string,isWelcomeback : boolean = false) {

    return [
        {
            text: `Hi ${name}!, ${isWelcomeback ? 'Welcome back!' : ''} Have other questions or concerns not listed? Feel free to message us here and one of our Project Management Officer will get back to you. 😊`
        }
    ]
}