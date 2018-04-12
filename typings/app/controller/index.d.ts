// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Course from '../../../app/controller/course';
import Login from '../../../app/controller/login';
import Shop from '../../../app/controller/shop';
import Trainer from '../../../app/controller/trainer';

declare module 'egg' {
  interface IController {
    course: Course;
    login: Login;
    shop: Shop;
    trainer: Trainer;
  }
}
