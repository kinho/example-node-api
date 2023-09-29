import test from 'node:test'
import assert from 'assert/strict'

import { create } from '../src/services/user.js'

test('create user without username', async () => {
  const valid = await create.validate(null, 'password')
  return assert.equal(valid, undefined)
})

test('create user without password', async () => {
  const valid = await create.validate('username', null)
  return assert.equal(valid, undefined)
})

test('create user with short username', async () => {
  const valid = await create.validate('u', 'password')
  return assert.equal(valid, undefined)
})

test('create user with correct values', async () => {
  const valid = await create.validate('username', 'password')

  assert.equal(valid.username, 'username')
  assert.equal(valid.password, 'password')
  return
})
