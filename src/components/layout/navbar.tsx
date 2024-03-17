import React, { Suspense } from 'react'

import AuthBtns from './authbtns'

const Navbar = () => {
  return (
    <nav className='bg-white dark:bg-dark drop-shadow-lg p-4 flex justify-end gap-4'>
      <Suspense fallback={'Loading...'}>
        <AuthBtns />
      </Suspense>
    </nav>
  )
}

export default Navbar
