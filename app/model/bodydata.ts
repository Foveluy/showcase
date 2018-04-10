import { Application } from 'egg'
import { ModelDefine } from './modeldefine'

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize
    
    const { STRING, TEXT } = Sequelize
    const model = ModelDefine(app, 'bodydata', {
        openid: {
            type: STRING(32),
            unique: true,
            allowNull: false
        },
        bodyData: TEXT,
        time: STRING(32)
    })

    

    return model
}
