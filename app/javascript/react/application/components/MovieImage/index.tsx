import React from 'react'
import { imageBaseUrl } from '@/utils/imageBaseUrl'

interface MovieImageProps {
  imageUrl?: string
  title?: string
}

const MovieImage: React.FC<MovieImageProps> = (props) => {
  const { imageUrl, title } = props

  return (
    <img src={`${imageBaseUrl}/${imageUrl}`} alt={title} style={{ height: '80px' }} />
  )
}

export default MovieImage
