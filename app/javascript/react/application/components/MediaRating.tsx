import { Paper } from '@mui/material'
import React from 'react'
import { round } from 'lodash'

type RatingSize = 'small' | 'medium' | 'large' | 'xlarge'

interface SizeConfig {
  height: string
  width: string
  fontSize: number
  borderRadius: number
  borderWidth: number
}

const SIZES: Record<RatingSize, SizeConfig> = {
  small: {
    height: '25px',
    width: '44px',
    fontSize: 14,
    borderRadius: 8,
    borderWidth: 1
  },
  medium: {
    height: '32px',
    width: '50px',
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 2
  },
  large: {
    height: '40px',
    width: '60px',
    fontSize: 20,
    borderRadius: 12,
    borderWidth: 2
  },
  xlarge: {
    height: '60px',
    width: '100px',
    fontSize: 24,
    borderRadius: 14,
    borderWidth: 3
  }
}

interface MediaRatingProps {
  rating: number
  size?: RatingSize
  margin?: string
  customSize?: {
    height?: string
    width?: string
    fontSize?: number
  }
}

const MediaRating = ({
  rating,
  size = 'medium',
  margin,
  customSize
}: MediaRatingProps): JSX.Element | null => {
  const roundedRating = round(rating, 1)
  const sizeConfig = SIZES[size]

  // Allow custom size to override predefined sizes
  const finalHeight = customSize?.height ?? sizeConfig.height
  const finalWidth = customSize?.width ?? sizeConfig.width
  const finalFontSize = customSize?.fontSize ?? sizeConfig.fontSize

  if (roundedRating === 0) return null

  return (
    <Paper
      sx={{
        border: `${sizeConfig.borderWidth}px solid #5D5D5D`,
        textAlign: 'center',
        color: 'secondary.main',
        height: finalHeight,
        width: finalWidth,
        borderRadius: sizeConfig.borderRadius,
        background: '#050505',
        margin,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <span className='is-bold' style={{ fontSize: finalFontSize }}>
        {roundedRating}
      </span>
    </Paper>
  )
}

export default MediaRating
