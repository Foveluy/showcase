import { Service } from 'egg';
import { userInfo } from './wechat';

export default class User extends Service {
  /**
   * 获取微信信息
   */
  public async getCurrentUser(): Promise<userInfo & { openid: string }> {
    const { ctx } = this;
    const user = <userInfo & { openid: string }>await ctx.model.User.findOne({
      where: {
        ticket: ctx.ticket
      }
    });
    return user;
  }
}
