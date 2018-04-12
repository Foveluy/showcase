import sequelize, { Options, Sequelize, Model } from 'sequelize'
import { VerifyOptions, SignOptions, DecodeOptions } from 'jsonwebtoken'

interface JWT {
  sign: (payload: string | Buffer | object, secretOrPrivateKey: Secret, options?: SignOptions) => string
  decode: (token: string, options?: DecodeOptions) => null | { [key: string]: any } | string
  verify: (token: string, secretOrPublicKey: string | Buffer, options?: VerifyOptions) => object | string
}

declare module 'egg' {
  // extend app
  interface Application {
    Sequelize: sequelize
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
    }
  }

  // extend your config
  interface EggAppConfig {
    sequelize: Options
    secret: string
  }
}
