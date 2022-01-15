import { html } from 'ube'

/**
 * Navigates to the new URL.
 * @param path 
 * @returns 
 */
export const goTo = (path) => {
  if (location.pathname !== path) history.pushState({}, '', path)
  window.dispatchEvent(new CustomEvent('render'))
  return html``
}