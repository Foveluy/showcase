import { Context } from 'egg'

export function WechatAuth(ctx: Context, ctl: any) {
  try {
    var token = ctx.request.headers['authorization']

    if (token) {
      token = token.split(' ')[1]
    } else {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MjA1NjY5Mjh9.OP8r2-asdasda'
    }
    ctx.app.jwt.verify(token, ctx.app.config.secret)
    ctx.logger.info('login_ok')
  } catch (e) {
    ctl.ResponseJson({
      state: 'login_fail'
    })
    ctx.app.logger.error(e.message)
    return false
  }
}
