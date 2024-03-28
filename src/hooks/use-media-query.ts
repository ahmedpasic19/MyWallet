import { useEffect, useState } from 'react'

function useMediaQuery(query: string) {
   const [isDesktop, setIsDesktop] = useState(false)

   useEffect(() => {
      const mediaQuery = window.matchMedia(query)

      const checkIsDesktop = () => {
         setIsDesktop(mediaQuery.matches)
      }

      // Initial check
      checkIsDesktop()

      // Event listener for changes in media query
      const mediaQueryListener = () => {
         checkIsDesktop()
      }
      mediaQuery.addListener(mediaQueryListener)

      // Cleanup
      return () => {
         mediaQuery.removeListener(mediaQueryListener)
      }
   }, [query])

   return isDesktop
}

export default useMediaQuery
