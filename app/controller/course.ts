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

    const transaction = await this.ctx.model.transaction()

    const booked = await ctx.model.CourseDetail.findOne({
      where: {
        courseID: ctx.request.body.courseId,
        openid: res.openid
      },
      transaction
    })

    if (booked === null) {
      const course: any = await ctx.model.Course.findOne({
        where: {
          id: ctx.request.body.courseId
        }
      })
      const member = parseInt(course.member)
      const maxMember = parseInt(course.maxMember)
      if (member >= maxMember) {
        this.logger.info('课程被定满了')
        transaction.commit()
        this.ResponseFail('课程已经被定满')
        return
      }

      await ctx.model.Course.update(
        {
          member: this.app.Sequelize.literal('member+1')
        },
        {
          where: {
            id: ctx.request.body.courseId
          },
          transaction
        }
      )

      await ctx.model.CourseDetail.create(
        {
          courseID: ctx.request.body.courseId,
          openid: res.openid,
          name: res.nickName,
          avatarUrl: res.avatarUrl
        },
        { transaction }
      )
      transaction.commit()
      this.RspJson(booked)
    } else {
      this.ResponseFail('您已经预定了本课程')
    }
  }
}
