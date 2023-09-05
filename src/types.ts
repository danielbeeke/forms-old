import { html } from 'ube'
import { Store } from 'n3'

export type RouteWithTemplate = {
  template: () => typeof html,
  redirect?: () => string
  [key: string]: any
  params?: Array<string>
}

export type RouteWithRedirect = {
  template?: () => typeof html,
  redirect: () => string
  [key: string]: any
  params?: Array<string>
}

export type Route = (context: {}) => void & (RouteWithTemplate | RouteWithRedirect)

declare global {
  var Comunica: any
  var launchQueue: {
    setConsumer: any
  }
}

export type ComunicaExport = {
  newEngine: Function
}

export type Tab = {
  title: string,
  data?: any,
  text?: string,
  id?: string,
  link: string,
  weight: number,
  store?: Store,
  fileHandle?: File,
  closable: boolean
}