import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
  const Sequelize = app.Sequelize

  const { STRING, BOOLEAN, INTEGER } = Sequelize
  const model = ModelDefine(app, 'courseDetail', {
    openid: {
      type: STRING(32),
      allowNull: false
    },
    name: {
      type: STRING(32),
      allowNull: false
    },
    avatarUrl: {
      type: STRING(128),
      allowNull: false
    },
    courseID: STRING(64),
    course: STRING(32),
    trainerId: INTEGER,
    date: STRING(32),
    enter: BOOLEAN,
    commited: BOOLEAN
  })

  return model
}
