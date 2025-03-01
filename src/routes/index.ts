
import authRouter from '../routes/api/auth'
import usersRouter from '../routes/api/users'
import inquiriesRouter from '../routes/api/inquiries'
import dashboardRouter from '../routes/api/dashboard'
import reEngageRouter from '../routes/api/reEngage'
import chatbotRouter from '../routes/webhook/chatbot'

export default function useRoutes(app : any){
    app.use('/api/auth', authRouter)
    app.use('/api/users', usersRouter)
    app.use('/api/inquiries', inquiriesRouter)
    app.use('/api/dashboard', dashboardRouter)
    app.use('/api/re-engage', reEngageRouter)
    app.use('/webhook', chatbotRouter)
}