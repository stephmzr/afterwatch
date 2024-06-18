import React from 'react'
import { Divider, type DividerProps } from '@mui/material'

const MuiDivider: React.FC<DividerProps> = (props) => {
  return (
    <Divider { ...props } />
  )
}

export default MuiDivider
