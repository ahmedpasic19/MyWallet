import React from 'react'

import Link, { LinkProps } from 'next/link'

const Box = ({ children, ...props }: LinkProps & { children: React.ReactNode }) => {
   return (
      <Link
         {...props}
         className="bg-card min-w-52 shadow-md rounded-md flex flex-col p-4 cursor-pointer hover:bg-accent/50 border-[0.25px] border-secondary"
      >
         {children}
      </Link>
   )
}

export default Box
