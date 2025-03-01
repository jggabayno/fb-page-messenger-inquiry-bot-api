import moment from 'moment';

import connection from '../config/db_connection';

// chatbot config
import { sendApi } from '../chatbot/services/fbGraphAPI';
import inquiryMessage from '../chatbot/services/inquiryMessage';
import * as blocks from '../chatbot/blocks/index'
// end chatbot config

export async function getInquiryByPlatformIdPersistence(platform_id : number){

    const sqlQuery = `SELECT i.id, i.user_id, i.platform_id, i.company_name, i.designation, i.description, i.status, \
    u.name, u.mobile_number, u.email, i.created_at, i.updated_at \
    FROM inquiries i JOIN users u ON u.id = i.user_id WHERE i.platform_id = ${platform_id} ORDER BY i.id`
    
    const [rows] : any = await connection.promise().query(sqlQuery)
 
    const isEmpty = rows?.toString() === '{}'

    return isEmpty ? [] : rows;

}

export function getInquiryByIdPersistence(id : number){


    async function initiate(){

        const sqlQuery = `SELECT i.id, i.user_id, i.platform_id, i.company_name, i.designation, i.description, i.status, \
        u.name, u.mobile_number, u.email, i.created_at, i.updated_at \
        FROM inquiries i JOIN users u ON u.id = i.user_id WHERE i.id = ${id} ORDER BY i.id`
        
        const [rows] : any = await connection.promise().query(sqlQuery)

        return rows.length ? rows[0] : {};
    }

    return initiate()

}

export function getOwnInquiryPersistence(user_id : number){ 
 

    async function initiate(){

        const sqlQuery = `SELECT i.id, i.user_id, i.platform_id, i.company_name, i.designation, i.description, i.status, \
        u.name, u.mobile_number, u.email, i.created_at, i.updated_at \
        FROM inquiries i JOIN users u ON u.id = i.user_id WHERE i.user_id = ${user_id} ORDER BY i.id`
        
        const [rows] : any = await connection.promise().query(sqlQuery)
 
        return rows;
    }

    return initiate()
 
}

export async function getInquiryPersistence(){

    const sqlQuery = `SELECT i.id, i.user_id, i.platform_id, i.company_name, i.designation, i.description, i.status,\
    u.name, u.mobile_number, u.email, i.created_at, i.updated_at\
    FROM inquiries i JOIN users u ON i.user_id = u.id ORDER BY i.id`
    
    const [inquries] : any = await connection.promise().query(sqlQuery)
    
    return inquries;
 
}

export async function createInquiryPersistence({ user_id, platform_id, company_name, designation, description, status } : any){

    const results = await connection.promise().query(
        `INSERT INTO inquiries (user_id, platform_id, company_name, designation, description, status, created_at)
        VALUES ('${user_id}', '${platform_id}', '${company_name}', '${designation}', '${description}', '${status}', '${moment().format('YYYY/MM/DD hh:mm:ss')}')`)

        const resultHeader: any = results[0]
        const insertedId = resultHeader?.insertId

        sendApi(platform_id, [{
            text:'Thank you for your inquiry! A Project Management Officer will be in touch with you within the next 24 to 48 hours.'
        }, ...blocks.greeting(platform_id, false)])

        return insertedId

}

export async function updateInquiryPersistence({ id, company_name, platform_id, designation, description, status } : any){

    const results = await connection.promise().query(
        `UPDATE inquiries SET ? WHERE id = ${id}`, {
            company_name, designation, description, status,
            updated_at: moment().format('YYYY/MM/DD hh:mm:ss')
        }
    )
 
        sendApi(platform_id, [{
            text: inquiryMessage(status)
        }, ...blocks.greeting(platform_id, false)])
        
        if (results) return id

}