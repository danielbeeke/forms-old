import UniversalRouter from 'universal-router'
import { Home } from '../routes/Home'
import { File } from '../routes/File'
import { Settings } from '../routes/Settings'
import { Sparql } from '../routes/Sparql'

const routes = [
  { path: '/', action: Home },
  { path: '/file/:file', action: File },
  { path: '/settings', action: Settings },
  { path: '/sparql', action: Sparql },
  { path: '(.*)', action: Home }
]

export const Router = new UniversalRouter(routes)