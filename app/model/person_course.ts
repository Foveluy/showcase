import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize

    const { STRING, INTEGER } = Sequelize
    const model = ModelDefine(app, 'personCourse', {
        openid: {
            type: STRING(32),
            allowNull: false
        },
        date: STRING(32),
        start: STRING(32),
        end: STRING(32),
        trainerId: INTEGER
    })

    return model
}
