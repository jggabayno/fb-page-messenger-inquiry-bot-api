import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
 
dotenv.config()

const tokenSecret : string | any = process.env.CHATBOT_VERIFY_TOKEN

export const createToken = (id : number, maxAge = 1 * 24 * 60 * 60
    ) => {
    return jwt.sign({id}, tokenSecret, {expiresIn: maxAge })
}

export const verifyToken = (token : string) => {
    return jwt.verify(token, tokenSecret, (err : any, decodedToken : string) => {
        if(err) {
            return false;
        }
        return decodedToken
    })
}