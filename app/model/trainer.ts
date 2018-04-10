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

  return model
}
