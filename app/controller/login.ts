import { bp } from 'egg-blueprint'

import * as crypto from 'crypto'
import { WechatAuth } from '../prerequisite/wechat-auth'
import Base from '../base/controllerbase';

export default class Login extends Base {
  @bp.post('/login')
  public async index() {
    const res = await this.service.wechat.getWechatInfo()

    const sha1 = crypto.createHash('sha1')
    const userToken = sha1.update(res.openid).digest('hex')
    const jwtToken = this.app.jwt.sign({ token: userToken }, this.app.config.secret, { expiresIn: 60 * 60 * 48 })
    this.logger.info('有人登录', jwtToken)
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
