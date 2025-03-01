export function aboutUs() {

    return [
        {
         text: `JGGabayno is Software Engineer who can build fullstacks applications.`
        },
        {
         attachment: {
             type: 'template',
             payload: {
                 template_type: 'button',
                 text:  `Do you want to know more about JGGabayno?`,
                 buttons: [
                     {
                         type: "web_url",
                         url: "https://jggabayno.vercel.app/",
                         title: "Learn more",
                         webview_height_ratio: "full"
                     },
                     {
                         type: "postback",
                         title: "Go back",
                         payload: "GO_BACK"
                     }
                 ]
             }
         }
     }
    ]
}