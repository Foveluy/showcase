import { WechatAuth } from '../prerequisite/wechat-auth'
import Base from '../base/controllerbase'
import { bp } from 'egg-blueprint'

export default class Course extends Base {
  @bp.post('/coursemodel', WechatAuth)
  public async getCourse() {
    const { ctx } = this
    const Id = ctx.request.body.modelId //0代表私教，1代表团课
    const cs = await ctx.model.CourseModel.findOne({ where: { id: Id } })

    this.RspJson(cs)
  }
}
