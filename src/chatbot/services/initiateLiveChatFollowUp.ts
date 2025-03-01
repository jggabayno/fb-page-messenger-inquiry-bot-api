export default function initiateLiveChatFollowUp({sendApi, blocks, user}: any){
    
    const ONE_MINUTE = 60_000

    setTimeout(() => {
    sendApi(user.id, blocks.liveChatDef())
    }, ONE_MINUTE)
}