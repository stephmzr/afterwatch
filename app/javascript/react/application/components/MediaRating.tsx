import { Paper, styled } from '@mui/material'
import React from 'react'
import './MediaRating.sass'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  border: '2px solid #5D5D5D',
  textAlign: 'center',
  color: theme.palette.secondary.main,
  height: 50,
  width: 80,
  borderRadius: 12,
  alignContent: 'center',
  background: '#050505'
}))

const MediaRating = ({ rating }: { rating: number }): JSX.Element => {
  return (
    <Item>
      <span className='is-bold rating'>{rating}</span>
    </Item>
  )
}

export default MediaRating
