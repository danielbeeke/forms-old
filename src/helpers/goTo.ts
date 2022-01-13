import { app } from '../App'

export const goTo = (path) => {
  if (app.path !== path) {
    app.path = path
    return app.render()
  }
}