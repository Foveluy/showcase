// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import CourseModel from '../../../app/controller/course-model';
import Course from '../../../app/controller/course';
import Login from '../../../app/controller/login';
import Shop from '../../../app/controller/shop';
import Trainer from '../../../app/controller/trainer';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    courseModel: CourseModel;
    course: Course;
    login: Login;
    shop: Shop;
    trainer: Trainer;
    user: User;
  }
}
