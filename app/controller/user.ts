import { bp } from 'egg-blueprint'

import { WechatAuth } from '../prerequisite/wechat-auth'
import Base from '../base/controllerbase'

export default class User extends Base {
  @bp.post('/user/info', WechatAuth)
  public async updateUserBody() {
    const { ctx } = this
    const course = await ctx.model.Course.findAll({
      where: {
        date: this.ctx.request.body.date
      }
    })
    this.RspJson(course)
  }
}
