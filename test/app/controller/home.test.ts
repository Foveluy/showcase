'use strict'

import * as assert from 'assert'
import { app } from 'egg-mock/bootstrap'



describe('test/app/controller/home.test.ts', () => {
  it('should GET /api/course', async () => {
    const result = await app
      .httpRequest()
      .post('/api/course')
      .set('Content-Type', 'application/json')
      .set('Authentication', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYzMjk1YWUyMTEyMmUyYmRiYjlhZTAwZWM1NDRiNWQyNWY1ZDM3YzQiLCJpYXQiOjE1MjM0ODU4NjMsImV4cCI6MTUyMzY1ODY2M30.BSHFHuT0TTwBE0IYGbx__EjA6QRfvcAOdd8IPFirbOE')
      .send(JSON.stringify({ date: '2018.3.30' }))
      .expect(200)

    assert(result.text === 'hi, egg')
  })
})
