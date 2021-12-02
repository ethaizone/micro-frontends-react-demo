import React from 'react'

declare global {
  function __webpack_init_sharing__(x: string): Promise<void>
  var __webpack_share_scopes__: any
  interface Window {
    init: (x: any) => Promise<void>
    get: (x: any) => Promise<any>
  }
}

function loadComponent(scope: string, module: string) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default')
    const container = window[scope] // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default)
    const factory = await window[scope].get(module)
    const Module = factory()
    return Module
  }
}

const useDynamicScript = (url: string) => {
  const [ready, setReady] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    if (!url) {
      return
    }

    const element = document.createElement('script')

    element.src = url
    element.type = 'text/javascript'
    element.async = true

    setReady(false)
    setFailed(false)

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`)
      setReady(true)
    }

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`)
      setReady(false)
      setFailed(true)
    }

    document.head.appendChild(element)

    return () => {
      console.log(`Dynamic Script Removed: ${url}`)
      document.head.removeChild(element)
    }
  }, [url])

  return {
    ready,
    failed,
  }
}

interface Props {
  url: string
  scope: string
  module: string
}

function Lazy(props: Props) {
  const { ready, failed } = useDynamicScript(props.url)

  if (!ready) {
    return <h2>Loading dynamic script: {props.url}</h2>
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.url}</h2>
  }

  const Component = React.lazy(loadComponent(props.scope, props.module))

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  )
}

export default Lazy
