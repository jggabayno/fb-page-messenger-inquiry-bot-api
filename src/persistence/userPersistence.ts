import connection from '../config/db_connection'
import sqlStatement from '../services/sqlStatement'
import { UserInterface } from '../interfaces/UserInterface'

import bcrypt from 'bcryptjs'
import moment from 'moment'

export async function getUserPersistence(user : UserInterface){ 
 
    const haEmptyParam = Object.entries(user).length === 0

    const [users] : any = await connection.promise().query(
        sqlStatement({ table: 'users',  select: '*', data: user, type: 'OR'})
    )

    return haEmptyParam ? users : (users.length ? users[0] : {});
 
}

export async function createUserPersistence({ role, name, email, mobile_number, password = '0' } : UserInterface){

    const hashedPassword = password !== '0' ? `'${await bcrypt.hash(password, 10)}'` : `NULLIF(${0}, 0)`

    const results = await connection.promise().query(
        `INSERT INTO users (role, name, email, mobile_number, password, created_at)
        VALUES (${role}, '${name}', '${email}', '${mobile_number}', ${hashedPassword}, '${moment().format('YYYY/MM/DD hh:mm:ss')}')`
    )

    const resultHeader: any = results[0]
    const insertedId = resultHeader?.insertId

    return insertedId

}

export async function updateUserPersistence({ id, role, name, mobile_number, email, password = '0' } : UserInterface){
    
    const hashedPassword = password !== '0' ? `'${await bcrypt.hash(password, 10)}'` : `NULLIF('${0}', 0)`

    const results = await connection.promise().query(
        `UPDATE users SET ? WHERE id = ${id}`, { role, name, mobile_number, email,
        password: hashedPassword, updated_at: moment().format('YYYY/MM/DD hh:mm:ss')
        }
    )
    
    if (results) return Number(id)

    return;
}