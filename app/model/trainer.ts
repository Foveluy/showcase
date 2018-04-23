import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
  const Sequelize = app.Sequelize

  const { STRING } = Sequelize
  const model = ModelDefine(app, 'trainer', {
    trainer: STRING(32),
    avatarUrl: STRING(256),
    bref: STRING(128),
    weChat: STRING(32),
    phone: STRING(32),
    email: STRING(32)
  })

  app.beforeStart(async () => {
    try {
      await model.create({
        id: 1,
        trainer: '方正',
        avatarUrl: 'https://pic1.zhimg.com/v2-deae641fba60b071f255ad1f0e3613cb_xl.jpg',
        bref: '我是一个很厉害的人',
        phone: '20000',
        email: 'snakegear@163.com'
      })
      await model.create({
        id: 2,
        trainer: '李鑫',
        avatarUrl: 'https://pic1.zhimg.com/v2-deae641fba60b071f255ad1f0e3613cb_xl.jpg',
        bref: '我是一个很厉害的人',
        phone: '20000',
        email: 'snakegear@163.com'
      })
    } catch (e) {
      app.logger.info('重复创建')
    }
  })

  return model
}
