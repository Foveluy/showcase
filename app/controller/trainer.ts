import { bp } from 'egg-blueprint'

import { WechatAuth } from '../prerequisite/wechat-auth'
import Base from '../base/controllerbase'

bp.prefix('/trainer', 'Trainer')
export default class Trainer extends Base {
    @bp.get('/', WechatAuth)
    public async getTrainer() {
        const { ctx } = this
        const Trainer = await ctx.model.Trainer.findAll()
        this.RspJson(Trainer)
    }

    @bp.post('/state', WechatAuth)
    public async bookingState() {
        const { ctx } = this
        const { date, trainerId } = ctx.request.body
        const TodayBooked = await this.service.trainer.todayBookState(date, trainerId)
        this.RspJson(TodayBooked)
    }

    @bp.post('/booking', WechatAuth)
    public async bookTrainer() {
        const { ctx } = this
        const { start, end, date, trainerId } = ctx.request.body
        const TodayBooked = await this.service.trainer.todayBookState(date, trainerId)
        let booked = false
        for (let i in TodayBooked) {
            const item: any = TodayBooked[i]
            console.log(item.start, item.end)
            if (item.start > end || item.end < start) {
                booked = false
            } else {
                //如果被预定立刻跳出
                booked = true
                break
            }
        }

        if (booked) {
            this.ResponseFail('教练已经被预定，请选择其他时段')
            this.logger.warn('教练被预定')
        } else {
            const user = await this.service.user.getCurrentUser()

            await ctx.model.PersonCourse.create({
                openid: user.openid,
                start: start,
                end: end,
                date: date,
                trainerId: trainerId
            })

            const TodayBooked = await this.service.trainer.todayBookState(date, trainerId)
            this.RspJson(TodayBooked)
        }
    }
}
