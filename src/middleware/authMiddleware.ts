import {NextFunction, Request, Response} from 'express'
import { verifyToken } from '../services/jwt'

export function privateRoute(req: Request, res: Response, next: NextFunction){

  const token = req.headers.authorization?.replace('Bearer ', '')

  const isVerified = token && verifyToken(token)

  if(isVerified) {
    next()
  } else {
    res.status(404).json({message: 'Un-Authenticated'});
  }
  
}