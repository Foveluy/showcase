import { Application } from 'egg'
import { Blueprint } from 'egg-blueprint'

export default (app: Application) => {
  // const { controller, router } = app
  Blueprint(app, { prefix: '/api' })
  // router.get('/', controller.home.index)
}
