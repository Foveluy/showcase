import { Controller } from 'egg'
import { bp } from 'egg-blueprint'

bp.prefix('/api', 'HomeController')
export default class HomeController extends Controller {
  @bp.get('/')
  public async index() {
    const { ctx } = this
    ctx.body = await ctx.service.test.sayHi('egg')
  }
}
