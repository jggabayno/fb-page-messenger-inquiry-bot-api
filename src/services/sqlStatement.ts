import { SQL_STATEMENT } from "../interfaces/SqlStatementInterface"

export default function statement({table, select = '', data = {}, type = ''} : SQL_STATEMENT) {

    const hasEmptyColumn = Object.entries(data).length === 0

    const sql_condition = JSON.stringify(data)
    .replaceAll('{"','')
    .replaceAll('}','')
    .replaceAll('":', ' = ')
    .replaceAll(',"', ` ${type} `)
    .replaceAll('"', '\'')

    return hasEmptyColumn ? `SELECT * FROM ${table}` : `SELECT ${select} FROM ${table} WHERE ` + sql_condition
}