import UniversalRouter from 'universal-router'
import { Home } from '../routes/Home'
import { File } from '../routes/File'
import { Settings } from '../routes/Settings'
import { NotFound } from '../routes/NotFound'

const routes = [
  { path: '/', action: Home },
  { path: '/file/:file', action: File },
  { path: '/settings', action: Settings },
  { path: '(.*)', action: NotFound }
]

export const Router = new UniversalRouter({
  async action({ next }) {
    return await next()
  },
  children: routes
})