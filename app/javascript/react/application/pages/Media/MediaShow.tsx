import React, { useCallback, useEffect, useState } from 'react'
import './styles/MediaShow.sass'
import { Container, Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { type MediaType } from '@/react/types'
import MediaImage from '../../components/MediaImage'
import { extractColors } from 'extract-colors'
import { imageBaseUrl } from '@/utils/imageBaseUrl'
import MediaCastList from './components/MediaCast/MediaCastList/MediaCastList'
import { GET_MEDIA } from './graphql/queries'
import MediaSummary from './components/MediaSummary/MediaSummary'
import MediaWatchProviders from './components/MediaWatchProviders/MediaWatchProviders'

const retrieveImg = async (response: any) => {
  const image = await response.blob()
  return image
}

const MediaShow = (): JSX.Element | null => {
  const { id, type } = useParams()
  const { data, loading } = useQuery(GET_MEDIA, {
    variables: { id, type }
  })

  const media: MediaType = data?.media

  const [bgColor, setBgColor] = useState<string | null>(null)

  const processImage = useCallback((posterPath: string) => {
    const targetUrl = `${imageBaseUrl.original}/${posterPath}`

    fetch(targetUrl)
      .then(retrieveImg)
      .then(blob => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = URL.createObjectURL(blob)
        img.onload = () => {
          extractColors(img)
            .then(colors => {
              const maxAreaColor = colors.reduce((max, color) => color.area > max.area ? color : max, colors[0])
              setBgColor(maxAreaColor.hex)
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
    if (media?.posterPath) {
      processImage(media.posterPath)
    }
  }, [media?.posterPath, processImage])

  if (loading) return null

  console.log(media)
  return (
    <>
    <Grid container spacing={0} className='media-show-grid' style={{ background: bgColor ?? '#7D7D7D' }}>
      {/* Empty space on the left */}
      <Grid item xl={2} sm={0}/>

      {/* Media poster */}
      <Grid item sm={3} xl={2} className='media-poster'>
        <MediaImage imageUrl={media.posterPath} title={media.title} height='343px' width='228px' />
      </Grid>

      {/* Media summary */}
      <Grid item sm={6} xl={4} className='media-summary'>
        {/* TODO: MediaSummary */}
        <MediaSummary
          title={media.title}
          releaseDate={media.releaseDate}
          originalLanguage={media.originalLanguage}
          genres={media.genres}
          runtime={media.runtime}
          tagline={media.tagline}
          overview={media.overview}
          voteAverage={media.voteAverage}
        />
      </Grid>
    </Grid>
    <Grid container spacing={0}>
      {/* Empty space on the left */}
      <Grid item xl={2} sm={0}/>

      {/* Media streaming providers */}
      <Grid item sm={3} xl={2} className='streaming-providers-grid'>
        <MediaWatchProviders providers={media?.watchProviders?.providers || []}/>
      </Grid>
      {/* Media cast list */}
      <Grid item sm={6} xl={4}>
        <Container maxWidth='md' sx={{ flexGrow: 1, mt: 2, ml: 0 }} disableGutters>
          <MediaCastList cast={media.credits.cast} />
        </Container>
      </Grid>
    </Grid>
    </>
  )
}

export default MediaShow
