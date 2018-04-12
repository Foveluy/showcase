// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Test from '../../../app/service/Test';
import Trainer from '../../../app/service/trainer';
import User from '../../../app/service/user';
import Wechat from '../../../app/service/wechat';

declare module 'egg' {
  interface IService {
    test: Test;
    trainer: Trainer;
    user: User;
    wechat: Wechat;
  }
}
