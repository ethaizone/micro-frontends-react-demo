import Lazy from '@/Lazy'
import * as React from 'react'
// const HomeRemote = React.lazy(
//   () => import('home/Home')
// )

function Home() {
  return (
    // <React.Suspense fallback='Loading Home'>
    //   <HomeRemote />
    // </React.Suspense>
    <Lazy url="http://localhost:8092/remoteEntry.js" scope="home" module="./Home" />
  )
}

export default Home
