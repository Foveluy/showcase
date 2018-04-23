import sequelize, { Options, Sequelize, SequelizeStatic, Model } from 'sequelize'
import { VerifyOptions, SignOptions, DecodeOptions } from 'jsonwebtoken'

interface JWT {
  sign: (payload: string | Buffer | object, secretOrPrivateKey: Secret, options?: SignOptions) => string
  decode: (token: string, options?: DecodeOptions) => null | { [key: string]: any } | string
  verify: (token: string, secretOrPublicKey: string | Buffer, options?: VerifyOptions) => object | string
}

declare module 'egg' {
  // extend app
  interface Application {
    Sequelize: SequelizeStatic //这里有问题
    model: Sequelize
    jwt: JWT
  }

  // extend context
  interface Context {
    model: Sequelize & {
      User: Model<{}, {}>
      Course: Model<{}, {}>
      Trainer: Model<{}, {}>
      PersonCourse: Model<{}, {}>
      CourseDetail: Model<{}, {}>
      CourseModel: Model<{}, {}>
    }
  }

  // extend your config
  interface EggAppConfig {
    sequelize: Options
    secret: string
    cors: any
  }
}

interface CourseDetail {
  openid?: string
  courseID?: string
  fuck?: string
}
