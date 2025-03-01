export function liveChatDef() {

    return [
        {
            text: 'Do you want to end live chat?',
            quick_replies: [
                {
                    title: 'Yes',
                    payload: 'END_TALK'
                },
                {
                    title: 'No',
                    payload: 'DISCARD_END_TALK'
                }
            ].map(quick_reply => ({ content_type: 'text', ...quick_reply }))
        }
    ]
}