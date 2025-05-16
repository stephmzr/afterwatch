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
  renderType?: 'original' | 'w500' | 'w154' | 'w45'
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
 * @param {'original' | 'w500' | 'w154' | 'w45'} [props.renderType] - The render type of the image (optional).
 * @returns {JSX.Element} The rendered media image component.
 */
const MediaImage: React.FC<MediaImageProps> = (props) => {
  const { imageUrl, title, height, width, borderRadius, rating = undefined, renderType = 'original' } = props
  const src = `${imageBaseUrl[renderType]}/${imageUrl}`

  return (
    <div className="media-image-container" style={{ height, width }}>
      <img src={src} alt={title} style={{ height, width, borderRadius: borderRadius ?? 0 }} />
      {rating !== undefined && (
        <div className="media-rating-overlay">
          <MediaRating rating={rating} size="small" />
        </div>
      )}
    </div>
  )
}

export default MediaImage
