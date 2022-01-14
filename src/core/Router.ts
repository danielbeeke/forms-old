import UniversalRouter from 'universal-router'
import { Home } from '../routes/Home'
import { File } from '../routes/File'
import { Settings } from '../routes/Settings'
import { NotFound } from '../routes/NotFound'
import { NewFile } from '../routes/NewFile'
import { goTo } from '../helpers/goTo'
import { state } from '../services/State'

const routes = [
  { path: '/', action: Home },
  { path: '/file/:file', action: File },
  { path: '/new/:formHash', action: NewFile },
  { path: '/settings', action: Settings },
  { path: '(.*)', action: NotFound }
]

export const Router = new UniversalRouter({
  async action({ next }) {
    if (!state.settings && location.pathname !== '/settings') {
      goTo('/settings')
    }

    return await next()
  },
  children: routes
})