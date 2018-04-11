import { Context } from 'egg'

export function WechatAuth (ctx: Context, ctl: any) {
  try {
    const { jwt_code } = ctx.request.body
    const obj = ctx.app.jwt.verify(jwt_code, ctx.app.config.secret)
    console.log(obj)
  } catch (e) {
    ctl.ResponseJson({
      state: 'bad'
    })
    ctx.app.logger.error(e)
    return false
  }
}
