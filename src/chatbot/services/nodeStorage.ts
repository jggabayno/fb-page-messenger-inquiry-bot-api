import { LocalStorage } from 'node-localstorage'

export default function makeNodeStorage() {

    // cns -chatbot-node-storage
    const storage : any = new LocalStorage('./.cns-cache')

    const getUser = (psid : string) => JSON.parse(storage.getItem(`${psid}_user`))
    const setUser = (psid : string, value : any) => storage.setItem(`${psid}_user`, JSON.stringify(value))

    const isLiveChat = (psid : string) => storage.getItem(`${psid}_isLiveChat`) === 'true'
    const setLiveChat = (psid : string, value : any) => storage.setItem(`${psid}_isLiveChat`, value)
    
    const getPrevious = (psid : string) => JSON.parse(storage.getItem(`${psid}_previous_received`))
    const setPrevious = (psid : string, value : any) => storage.setItem(`${psid}_previous_received`, JSON.stringify(value))

    return {
        getUser, setUser, 
        isLiveChat, setLiveChat,
        getPrevious, setPrevious,
    }

}