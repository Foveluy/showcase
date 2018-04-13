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
    member: INTEGER,
    maxMember: INTEGER,
    trainerId: INTEGER,
    time: STRING(32),
    date: STRING(16),
    courseModel: STRING(64),
    credit: INTEGER,
    state: {
      type: STRING(8),
      defaultValue: 'no'
    }
  })

  app.beforeStart(async () => {
    model.create({
      course: '力量训练123xyz',
      member: 0,
      maxMember: 3,
      trainerId: 1,
      time: '15:00~18:00',
      date: '4.13'
    })
    model.create({
      course: '力量训练123xyz',
      member: 0,
      maxMember: 3,
      trainerId: 2,
      time: '15:00~18:00',
      date: '4.13'
    })
  })

  return model
}
