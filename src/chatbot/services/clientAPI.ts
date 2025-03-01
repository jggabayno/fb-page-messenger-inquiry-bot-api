import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const headers : any = {
    Authorization: `Bearer ${process.env.CLIENT_API_TOKEN}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export async function getInquirerByPlatformId(platformId : string) {
   
    try {

        const response = await axios.get(`${process.env.CLIENT_API_URL}/inquiries/platform/${platformId}`, headers)
        const data = await response.data

        return data;

    } catch (error) {
 
        throw Error(error.message)

    }

}