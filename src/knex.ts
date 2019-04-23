import knex from 'knex'
import assert from 'assert'
import _ from 'lodash'

const {
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  DB_DATABASE
} = process.env

export const pg = knex({
  client: 'pg',
  connection: {
    host: DB_HOST,
    password: DB_PASSWORD,
    user: DB_USER,
    database: DB_DATABASE
  }
})

export function upsert({ table, object, key, updateIgnore = [] }) {
  const keys = typeof key === 'string' ? [key] : key
  keys.forEach(field =>
    assert(_.has(object, field), `Key "${field}" is missing.`)
  )

  const updateFields = _.difference(_.keys(_.omit(object, keys)), updateIgnore)
  const insert = pg.table(table).insert(object)
  const keyPlaceholders = new Array(keys.length).fill('??').join(',')

  if (updateFields.length === 0) {
    return pg
      .raw(`? ON CONFLICT (${keyPlaceholders}) DO NOTHING RETURNING *`, [insert, ...keys])
      .then(result => _.get(result, ['rows', 0]))
  }

  const update = pg.queryBuilder().update(_.pick(object, updateFields))
  return pg
    .raw(`? ON CONFLICT (${keyPlaceholders}) DO ? RETURNING *`, [insert, ...keys, update])
    .then(result => _.get(result, ['rows', 0]))
}

export async function now() {
  return await pg.select(pg.raw('NOW()'))
}