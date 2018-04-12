import { Controller } from 'egg'

export default class Base extends Controller {
  ResponseJson(body) {
    const { ctx } = this
    ctx.body = JSON.stringify(body)
    ctx.set('Content-Type', 'application/json')
  }

  RspJson(obj: any) {
    const { ctx } = this
    ctx.body = JSON.stringify({
      state: 'ok',
      data: obj
    })
    ctx.set('Content-Type', 'application/json')
  }

  ResponseFail(message: string = 'error') {
    const { ctx } = this
    ctx.body = JSON.stringify({
      state: 'fail',
      message: message
    })
    ctx.set('Content-Type', 'application/json')
  }
}
