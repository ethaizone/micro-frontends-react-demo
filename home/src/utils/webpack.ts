declare global {
  interface Window {
    getWebpackBundleRootPath: () => string
    homescript: HTMLScriptElement | null
  }
}

window.homescript = window.homescript || document.currentScript as HTMLScriptElement | null

/**
 * Function for resolving root path of webpack project.
 * This make project can support CDN.
 *
 * Function name can't be change. It need to be name with webpack config.
 * Ref: https://stackoverflow.com/a/64048787
 */
window.getWebpackBundleRootPath = function () {
  let prefixPath = ''
  if (window.homescript) {
    const fullURL = new URL(window.homescript.src).href
    prefixPath = fullURL.replace(/\/[^/]+?$/, '/')
  }
  return prefixPath
}

export {}
