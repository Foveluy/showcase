import { bp } from 'egg-blueprint'

import * as crypto from 'crypto'
import { WechatAuth } from '../prerequisite/wechat-auth'
import Base from '../base/controllerbase'

export default class Login extends Base {
  @bp.post('/login')
  public async index() {
    const res = await this.service.wechat.getWechatInfo()

    const sha1 = crypto.createHash('sha1')
    const ticket = sha1.update(res.openid).digest('hex')
    const jwtToken = this.app.jwt.sign({ token: ticket }, this.app.config.secret, { expiresIn: 60 * 60 * 48 })

    const model = await this.ctx.model
    const transaction = await this.ctx.model.transaction()

    const openid = await model.User.findOne({
      where: {
        openid: res.openid
      },
      transaction
    })

    if (openid) {
      this.logger.info('老客人登录', res.userInfo.nickName)
      await model.User.update(
        { nickName: res.userInfo.nickName, ticket: ticket, avatarUrl: res.userInfo.avatarUrl },
        { where: { openid: openid }, transaction }
      )
    } else {
      this.logger.info('新玩家注册', res.userInfo.nickName)
      await model.User.create({
        openid: res.openid,
        nickName: res.userInfo.nickName,
        ticket: ticket,
        avatarUrl: res.userInfo.avatarUrl,
        gender: res.userInfo.gender,
        city: res.userInfo.city
      })
    }

    await transaction.commit()

    this.ResponseJson({
      state: 'ok',
      ticket: jwtToken
    })
  }

  @bp.get('/login/check', WechatAuth)
  public async check() {
    // todo检查jwt是否到期
    this.ResponseJson({
      state: 'ok',
      ticket: 'asd'
    })
  }
}
