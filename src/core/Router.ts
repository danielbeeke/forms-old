import UniversalRouter from 'universal-router'
import { Home } from '../routes/Home'
import { File } from '../routes/File'
import { Settings } from '../routes/Settings'
import { NotFound } from '../routes/NotFound'
import { goTo } from '../helpers/goTo'

const routes = [
  { path: '/', action: Home },
  { path: '/file/:file', action: File },
  { path: '/settings', action: Settings },
  { path: '(.*)', action: NotFound }
]

export const Router = new UniversalRouter({
  async action({ next }) {
    if (!localStorage.domains) {
      goTo('/settings')
    }

    return await next()
  },
  children: routes
})