import { Service } from 'egg'

export default class Trainer extends Service {
  /**
   * 获取微信信息
   */
  public async todayBookState(trainer: string, date: string) {
    const { ctx } = this

    return await ctx.model.PersonCourse.findAll({
      where: {
        trainer,
        date
      }
    })
  }
}
