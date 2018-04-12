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
    const { date, trainer } = ctx.request.body
    const TodayBooked = await this.service.trainer.todayBookState(date, trainer)
    this.RspJson(TodayBooked)
  }

  @bp.post('/', WechatAuth)
  public async bookTrainer() {
    const { ctx } = this
    const { start, end, date, trainer } = ctx.request.body
    const TodayBooked = await this.service.trainer.todayBookState(date, trainer)
    let booked = false
    for (let i in TodayBooked) {
      const item: any = TodayBooked[i]
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
    } else {
      await ctx.model.PersonCourse.create({ start, end, date, trainer })
      this.RspJson('预定成功')
    }
  }
}
