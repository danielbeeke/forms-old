import { html } from 'ube'
import { header } from '../templates/header'
import { app } from '../App'
import { state } from '../services/State'

export const Home = (context) => ({
  name: 'home',
  async template () {
    const forms = await state.getForms()

    console.log(forms)

    return html`
      ${header()}
    `
  }
})