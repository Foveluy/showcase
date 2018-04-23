'use strict'

import { EggAppConfig, PowerPartial } from 'egg'

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>

// app special config scheme
export interface BizConfig {
  sourceUrl: string
  middleware: string[]
  wechat: {
    appid: string
    secret: string
  }
}

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`

  config.wechat = {
    appid: 'wx04a308ed79815bb9',
    secret: '2e71b19f75f646c735be3dcfeef7949b'
  }

  config.secret = '123456'

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_floveluy'

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://localhost:3000']
  }

  config.logger = {
    level: 'DEBUG'
  }

  config.cors = {
    origin: '*'
  }

  // add your config here
  config.middleware = []

  return config
}
