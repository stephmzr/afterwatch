import React from 'react'
import { imageBaseUrl } from '@/utils/imageBaseUrl'

interface MediaImageProps {
  imageUrl?: string
  title?: string
  height?: string
  width?: string
}

const MediaImage: React.FC<MediaImageProps> = (props) => {
  const { imageUrl, title, height, width } = props

  return (
    <img src={`${imageBaseUrl}/${imageUrl}`} alt={title} style={{ height, width, borderRadius: '6px' }} />
  )
}

export default MediaImage
