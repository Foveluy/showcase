import sequelize, { Options, Sequelize, Model } from 'sequelize'

declare module 'egg' {
  // extend app
  interface Application {
    Sequelize: sequelize
    model: Sequelize
  }

  // extend context
  interface Context {
    model: Sequelize & {
      User: Model<{}, {}>
    }
  }

  // extend your config
  interface EggAppConfig {
    sequelize: Options
  }
}
