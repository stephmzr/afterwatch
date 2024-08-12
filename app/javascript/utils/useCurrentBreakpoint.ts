import { useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react"

const useCurrentBreakpoint = () => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMd = useMediaQuery(theme.breakpoints.only('md'))
  const isLg = useMediaQuery(theme.breakpoints.only('lg'))
  const isXl = useMediaQuery(theme.breakpoints.only('xl'))

  const [currentBreakpoint, setCurrentBreakpoint] = useState<string | null>(null)

  useEffect(() => {
    if (isXs) setCurrentBreakpoint('xs')
    else if (isSm) setCurrentBreakpoint('sm')
    else if (isMd) setCurrentBreakpoint('md')
    else if (isLg) setCurrentBreakpoint('lg')
    else if (isXl) setCurrentBreakpoint('xl')
  }, [isXs, isSm, isMd, isLg, isXl])

  useEffect(() => {
    if (currentBreakpoint) {
      console.log(`Current breakpoint: ${currentBreakpoint}`)
    }
  }, [currentBreakpoint])

  return currentBreakpoint
}

export default useCurrentBreakpoint
