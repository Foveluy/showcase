import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
  const Sequelize = app.Sequelize

  const { STRING, TEXT } = Sequelize
  const model = ModelDefine(app, 'courseModel', {
    course: {
      type: STRING(32)
    },
    courseModel: TEXT
  })

  return model
}
