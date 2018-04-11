import { Controller } from 'egg'

export default class Base extends Controller {
  ResponseJson(body) {
    const { ctx } = this
    ctx.body = JSON.stringify(body)
    ctx.set('Content-Type', 'application/json')

  }
}
