import test from 'node:test'
import assert from 'assert/strict'

import { userService } from '../services/user.js'

test('create user without username', async () => {
  const valid = await userService.createValidation(null, 'password')
  return assert.equal(valid, undefined)
})

test('create user without password', async () => {
  const valid = await userService.createValidation('username', null)
  return assert.equal(valid, undefined)
})

test('create user with short username', async () => {
  const valid = await userService.createValidation('u', 'password')
  return assert.equal(valid, undefined)
})

test('create user with correct values', async () => {
  const valid = await userService.createValidation('username', 'password')

  assert.equal(valid.username, 'username')
  assert.equal(valid.password, 'password')
  return
})
