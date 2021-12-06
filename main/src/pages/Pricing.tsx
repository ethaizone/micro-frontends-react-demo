// import Lazy from '@/Lazy'
import * as React from 'react'
const PricingRemote = React.lazy(
  () => import('pricing/Pricing')
)

function Pricing() {
  return (
    <React.Suspense fallback='Loading Pricing'>
      <PricingRemote />
    </React.Suspense>
    // Another solution.
    // <Lazy url="http://localhost:8093/remoteEntry.js" scope="pricing" module="./Pricing" />
  )
}

export default Pricing
