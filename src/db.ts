import knex from 'knex'
import assert from 'assert'
import _ from 'lodash'
import { PubSub } from 'apollo-server'
import { GooglePubSub } from '@axelspringer/graphql-google-pubsub'

const { DB_PASSWORD, DB_USER, DB_DATABASE } = process.env
const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql'

function commonMessageHandler({ attributes = {}, data = '' }) {
  console.log('subscription DATA', data)
  return {
    ...attributes,
    text: data.toString()
  }
}

export const pubsub = new GooglePubSub({}, undefined, commonMessageHandler)

export const pg = knex({
  client: 'pg',
  connection: {
    host: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    password: DB_PASSWORD,
    user: DB_USER,
    database: DB_DATABASE
  },
  pool: { max: 5, min: 5, acquireTimeoutMillis: 60000, idleTimeoutMillis: 600000 }
})

export function upsert({ table, object, key, updateIgnore = [] }) {
  const keys = typeof key === 'string' ? [key] : key
  keys.forEach(field => assert(_.has(object, field), `Key "${field}" is missing.`))

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
