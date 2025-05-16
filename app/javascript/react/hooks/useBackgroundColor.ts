import { useState, useCallback, useEffect } from 'react'
import { extractColors } from 'extract-colors'
import { imageBaseUrl } from '@/utils/imageBaseUrl'
import { COLOR_CONSTANTS } from '@/utils/colors'

interface ColorScheme {
  backgroundColor: string
  textColor: string
}

const getLuminance = (hexColor: string): number => {
  const rgb = parseInt(hexColor.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

const darkenColor = (hexColor: string, factor: number = 0.5): string => {
  const rgb = parseInt(hexColor.slice(1), 16)
  const r = Math.floor(((rgb >> 16) & 0xff) * factor)
  const g = Math.floor(((rgb >> 8) & 0xff) * factor)
  const b = Math.floor((rgb >> 0) & 0xff * factor)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

const retrieveImg = async (response: any): Promise<Blob> => {
  const image = await response.blob()
  return image
}

export const useBackgroundColor = (imagePath: string | undefined): ColorScheme => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>({
    backgroundColor: COLOR_CONSTANTS.DEFAULT_BACKGROUND,
    textColor: COLOR_CONSTANTS.DEFAULT_TEXT
  })

  const processImage = useCallback((posterPath: string) => {
    const targetUrl = `${imageBaseUrl.original}/${posterPath}`

    fetch(targetUrl)
      .then(retrieveImg)
      .then((blob: Blob) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = URL.createObjectURL(blob)
        img.onload = () => {
          extractColors(img)
            .then(colors => {
              const maxAreaColor = colors.reduce((max, color) =>
                color.area > max.area ? color : max, colors[0]
              )
              const dominantColor = maxAreaColor.hex
              const luminance = getLuminance(dominantColor)

              setColorScheme({
                backgroundColor: luminance > COLOR_CONSTANTS.LUMINANCE_THRESHOLD
                  ? darkenColor(dominantColor, COLOR_CONSTANTS.DARKEN_FACTOR)
                  : dominantColor,
                textColor: COLOR_CONSTANTS.DEFAULT_TEXT
              })
            })
            .catch(console.error)
        }
        img.onerror = (error) => {
          console.error('Image failed to load', error)
        }
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (imagePath) {
      processImage(imagePath)
    }
  }, [imagePath, processImage])

  return colorScheme
}
