import { Card, type CardProps } from '@mui/material'
import React from 'react'

const MuiCard: React.FC<CardProps> = (props) => {
  return (
    <Card {...props}>
      {props.children}
    </Card>
  )
}

export default MuiCard
