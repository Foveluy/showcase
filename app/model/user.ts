import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
  const Sequelize = app.Sequelize

  const { STRING, TEXT, INTEGER, BIGINT } = Sequelize
  const user = ModelDefine(app, 'user', {
    openid: {
      type: STRING(128),
      unique: true,
      allowNull: false
    },
    ticket: STRING(128),
    nickName: TEXT,
    gender: INTEGER,
    city: STRING(16),
    avatarUrl: STRING(256),
    credit: INTEGER,
    admin: STRING(8),
    trainer: STRING(8),
    body: Sequelize.JSON, //todo:json
    phone: STRING(16),
    unitPrice: INTEGER,
    birthdate: BIGINT,
    realName: STRING(8)
  })

  return user
}
