import { useMediaQuery, useTheme } from "@mui/material"
import { useEffect } from "react"

const theme = useTheme()
const isXs = useMediaQuery(theme.breakpoints.only('xs'))
const isSm = useMediaQuery(theme.breakpoints.only('sm'))
const isMd = useMediaQuery(theme.breakpoints.only('md'))
const isLg = useMediaQuery(theme.breakpoints.only('lg'))
const isXl = useMediaQuery(theme.breakpoints.only('xl'))

useEffect(() => {
  if (isXs) console.log('Current breakpoint: xs')
  else if (isSm) console.log('Current breakpoint: sm')
  else if (isMd) console.log('Current breakpoint: md')
  else if (isLg) console.log('Current breakpoint: lg')
  else if (isXl) console.log('Current breakpoint: xl')
}, [isXs, isSm, isMd, isLg, isXl])
