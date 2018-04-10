import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
  const Sequelize = app.Sequelize

  const { STRING, INTEGER } = Sequelize
  const model = ModelDefine(app, 'personCourse', {
    openid: {
      type: STRING(32),
      unique: true,
      allowNull: false
    },
    date: STRING(32),
    start: INTEGER,
    end: INTEGER,
    trainer: STRING(16),
    commit: STRING(8),
    enter: STRING(8)
  })

  return model
}
