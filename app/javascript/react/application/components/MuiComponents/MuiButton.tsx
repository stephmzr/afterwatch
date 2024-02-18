import { Button, type ButtonProps } from '@mui/material'
import React from 'react'

const MuiButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button {...props} ref={undefined}>
      {props.children}
    </Button>
  )
}

export default MuiButton
