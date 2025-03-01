import db from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const connection = db.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

export default connection