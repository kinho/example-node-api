import auth from './auth.js'
import user from './user.js'

const routes = (app) => {
  app.use('/',     auth)
  app.use('/user', user)
}

export default routes
