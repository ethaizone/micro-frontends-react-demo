import Lazy from '@/Lazy'
import * as React from 'react'

function Pricing() {
  return (
    <Lazy url="http://localhost:8093/remoteEntry.js" scope="pricing" module="./Pricing" />
  )
}

export default Pricing
