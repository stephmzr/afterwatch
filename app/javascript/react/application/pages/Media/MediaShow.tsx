import React, { useEffect, useState } from 'react'
import './styles/MediaShow.sass'
import { Container, Grid, Stack } from '@mui/material'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { MOVIE_SHOW_FRAGMENT, TV_SHOW_FRAGMENT } from './graphql/fragments'
import { type MediaType } from '@/react/types'
import dayjs from '@/utils/dayjs'
import MediaImage from '../../components/MediaImage'
import MediaRating from '../../components/MediaRating'
import { extractColors } from 'extract-colors'
import { imageBaseUrl } from '@/utils/imageBaseUrl'
import MuiDivider from '../../components/MuiComponents/MuiDivider'
import useI18n from '@/utils/useI18n'
import MediaSynopsis from './components/MediaSynopsis/MediaSynopsis'
import MediaCastList from './components/MediaCast/MediaCastList/MediaCastList'

const GET_MEDIA = gql`
  query media($id: ID!, $type: String!, $withCredits: Boolean) {
    media(id: $id, type: $type, withCredits: $withCredits) {
      ... on Movie {
        ...MovieShowInfo
        credits {
          id
          director {
            id
            name
            profilePath
          }
          cast {
            id
            name
            profilePath
            character
          }
          crew {
            id
            name
            profilePath
            job
          }
        }
      }
      ... on Tv {
        ...TvShowInfo
      }
    }
  }
  ${MOVIE_SHOW_FRAGMENT}
  ${TV_SHOW_FRAGMENT}
`

const retrieveImg = async (response: any) => {
  const image = await response.blob()
  return image
}

const MediaShow = (): JSX.Element | null => {
  const { id, type } = useParams()
  const { t } = useI18n()
  const { data, loading } = useQuery(GET_MEDIA, {
    variables: { id, type, withCredits: true }
  })

  const media: MediaType = data?.media

  const [bgColor, setBgColor] = useState<string | null>(null)

  useEffect(() => {
    if (media?.posterPath) {
      const targetUrl = `${imageBaseUrl}/${media.posterPath}`

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
    }
  }, [media?.posterPath])

  if (loading) return null

  console.log(media)

  return (
    <>
    <Grid container spacing={0} className='media-show-grid' justifyContent="center" style={{ background: bgColor ?? '#7D7D7D' }}>
      <Grid item xs={2} className='media-poster'>
        <MediaImage imageUrl={media.posterPath} title={media.title} height='343px' width='228px' />
      </Grid>
      <Grid item xl={6} className='media-summary'>
        <h1>
          <Stack direction='row' gap={2}>
            <span className='is-bold'>{media?.title}</span>
            <span className='media-release-year'>({dayjs(media?.releaseDate, 'DD/MM/YYYY').year()})</span>
          </Stack>
        </h1>
        <p>
          {media?.releaseDate.toString()} ({media.originalLanguage.toUpperCase()}) - {media.genres.map((genre) => genre.name).join(', ')} - {media.runtime} min
        </p>
        {/* <p>RATINGS</p> */}
        <p className='is-italic tagline'>{media.tagline}</p>
        <Stack direction='row' justifyContent='space-between'>
          <span></span>
          <MediaRating rating={media.voteAverage} />
        </Stack>
      </Grid>
    </Grid>
    <Container component="main" maxWidth='md' sx={{ flexGrow: 1, mt: 2 }}>
      <MediaSynopsis synopsis={media.overview} />
      <MediaCastList cast={media.credits.cast} />
    </Container>
    </>
  )
}

export default MediaShow
