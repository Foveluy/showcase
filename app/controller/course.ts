import { WechatAuth } from '../prerequisite/wechat-auth'
import Base from '../base/controllerbase'
import { bp } from 'egg-blueprint'

export default class Course extends Base {
    @bp.post('/course', WechatAuth)
    public async getCourse() {
        const { ctx } = this
        const course = await ctx.model.Course.findAll({
            where: {
                date: this.ctx.request.body.date
            }
        })
        this.RspJson(course)
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
