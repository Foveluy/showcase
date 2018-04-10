import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
  const Sequelize = app.Sequelize

  const { STRING, INTEGER } = Sequelize
  const model = ModelDefine(app, 'course', {
    course: {
      type: STRING(32),
      allowNull: false
    },
    member: STRING(32),
    maxMember: INTEGER,
    trainer: INTEGER,
    time: STRING(32),
    date: STRING(16),
    courseModel: STRING(64),
    credit: INTEGER,
    state: {
      type: STRING(8),
      defaultValue: 'no'
    }
  })

  return model
}
