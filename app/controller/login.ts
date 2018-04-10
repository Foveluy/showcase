import { bp } from 'egg-blueprint'
import Base from './controllerbase'

interface WechatInfo {
  data: {
    session_key: string
    expires_in: 7200
    openid: string
  }
}

export default class Login extends Base {
  @bp.post('/login')
  public async index() {
    const { ctx } = this
    const { code, userInfo } = ctx.request.body
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.app.config.wechat.appid}&secret=${
      this.app.config.wechat.secret
    }&js_code=${code}&grant_type=authorization_code`

    const res: WechatInfo = await ctx.curl(url, { dataType: 'json' })

    console.log(res.data, userInfo)

  
    this.ResponseJson({
      state: 'ok',
      ticket: res.data.openid
    })
  }

  @bp.post('/login/check')
  public async check(){
    // const { ctx } = this
    // const { code, userInfo } = ctx.request.body
    // todo检查jwt是否到期
    this.ResponseJson({
      state: 'bad',
      ticket: 'asd'
    })
  }

}
