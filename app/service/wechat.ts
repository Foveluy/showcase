import { Service } from 'egg'

interface WechatInfo {
  session_key: string
  expires_in: number
  openid: string
  userInfo: {
    nickName: string
    gender: number
    language: string
    city: string
    province: string
    country: string
    avatarUrl: string
  }
}

export default class wechat extends Service {
  /**
   * 获取微信信息
   */
  public async getWechatInfo(): Promise<WechatInfo> {
    const { ctx } = this
    const { code, userInfo } = ctx.request.body
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.app.config.wechat.appid}&secret=${
      this.app.config.wechat.secret
    }&js_code=${code}&grant_type=authorization_code`

    console.log(userInfo)

    const res = await ctx.curl(url, { dataType: 'json' })
    return { ...res.data, userInfo }
  }
}
