import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
  const Sequelize = app.Sequelize

  const { STRING, TEXT } = Sequelize
  const model = ModelDefine(app, 'commit', {
    trainer: {
      type: STRING(32),
      unique: true,
      allowNull: false
    },
    user: STRING(32),
    userUrl: STRING(128),
    time: STRING(32),
    commit: TEXT,
    commitType: {
      type: STRING(8),
      defaultValue: 'false'
    },
    openid: STRING(64)
  })

  return model
}
