import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
  const Sequelize = app.Sequelize

  const { STRING, TEXT } = Sequelize
  const model = ModelDefine(app, 'courseModel', {
    title: STRING(32),
    bref: TEXT
  })

  app.beforeStart(async () => {
     model.create({ title: '力量训练x课程', bref: '这种力量训练课程非常的牛逼' })
  })

  return model
}
