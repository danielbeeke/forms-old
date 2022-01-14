import { app } from '../App'

export const goTo = (path) => {
  if (location.pathname !== path) history.pushState({}, '', path)
  return app.render()
}