import React from 'react'
import { imageBaseUrl } from '@/utils/imageBaseUrl'
import MediaRating from './MediaRating'
import './MediaImage.sass'

interface MediaImageProps {
  imageUrl?: string
  title?: string
  height?: string
  width?: string
  rating?: number
  borderRadius?: number
}

/**
 * Renders a media image component.
 *
 * @component
 * @param {MediaImageProps} props - The component props.
 * @param {string} props.imageUrl - The URL of the image.
 * @param {string} props.title - The title of the image.
 * @param {string} props.height - The height of the image.
 * @param {string} props.width - The width of the image.
 * @param {number} [props.borderRadius] - The border radius of the image (optional).
 * @param {number} [props.rating] - The rating of the image (optional).
 * @returns {JSX.Element} The rendered media image component.
 */
const MediaImage: React.FC<MediaImageProps> = (props) => {
  const { imageUrl, title, height, width, borderRadius, rating = undefined } = props
  console.log(`${imageBaseUrl}/${imageUrl}`)
  return (
    <div className="media-image-container" style={{ height, width }}>
      <img src={`${imageBaseUrl}/${imageUrl}`} alt={title} style={{ height, width, borderRadius: borderRadius ?? 0 }} />
      {rating !== undefined && (
        <div className="media-rating-overlay">
          <MediaRating rating={rating} width='44px' height='25px' fontSize={14} />
        </div>
      )}
    </div>
  )
}

export default MediaImage
