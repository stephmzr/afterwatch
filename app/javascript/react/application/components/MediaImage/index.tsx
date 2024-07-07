import React from 'react'
import { imageBaseUrl } from '@/utils/imageBaseUrl'

interface MediaImageProps {
  imageUrl?: string
  title?: string
}

const MediaImage: React.FC<MediaImageProps> = (props) => {
  const { imageUrl, title } = props

  return (
    <img src={`${imageBaseUrl}/${imageUrl}`} alt={title} style={{ height: '84px', borderRadius: '6px' }} />
  )
}

export default MediaImage
