import { WechatAuth } from '../prerequisite/wechat-auth'
import Base from '../base/controllerbase'
import { bp } from 'egg-blueprint'

export default class Course extends Base {
  @bp.post('/course', WechatAuth)
  public async getCourse() {
    const { ctx } = this
    const type = this.ctx.request.body.type //0代表私教，1代表团课
    if (type === 1) {
      console.log(ctx.request.body.date)
      //团课
      var include: any = [
        {
          association: ctx.model.Course.belongsTo(ctx.model.Trainer, { foreignKey: 'trainerId' }),
          attributes: ['trainer']
        }
      ]

      const res = await ctx.model.Course.findAll({
        include: include,
        where: {
          date: ctx.request.body.date
        }
      })

      this.RspJson(res)
    } else {
      //私教
      const Trainer = await ctx.model.Trainer.findAll()
      this.RspJson(Trainer)
    }
  }

  @bp.post('/course/book', WechatAuth)
  public async bookCourse() {
    const { ctx } = this
    const res = await this.service.user.getCurrentUser()

    await ctx.model.CourseDetail.create({
      courseID: ctx.request.body.courseID,
      openid: res.openid
    })
    this.RspJson()
  }
}
