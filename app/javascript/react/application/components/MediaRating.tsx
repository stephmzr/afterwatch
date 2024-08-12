import { Paper, styled } from '@mui/material'
import React from 'react'
import { round } from 'lodash'

interface ItemProps {
  height?: string
  width?: string
  margin?: string
}

const Item = styled(Paper)<ItemProps>(({ theme, height, width, margin }) => ({
  ...theme.typography.body2,
  border: '2px solid #5D5D5D',
  textAlign: 'center',
  color: theme.palette.secondary.main,
  height: height ?? '50px',
  width: width ?? '80px',
  borderRadius: 12,
  alignContent: 'center',
  background: '#050505',
  margin,
}))

const MediaRating = ({ rating, height, width, fontSize = 26, margin }: { rating: number, height?: string, width?: string, fontSize?: number, margin?: string }): JSX.Element => {
  const roundedRating = round(rating, 1)
  return (
    <Item height={height} width={width} margin={margin}>
      <span className='is-bold' style={{ fontSize }}>{roundedRating}</span>
    </Item>
  )
}

export default MediaRating
