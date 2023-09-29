import auth from './auth.js'
import user from './user.js'
import news from './news.js'

const routes = (app) => {
  app.use('/',     auth)
  app.use('/user', user)
  app.use('/news', news)
}

export default routes
