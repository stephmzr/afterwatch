import React from 'react'
import './styles/MediaShow.sass'
import { Grid, Skeleton } from '@mui/material'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { MOVIE_SHOW_FRAGMENT, TV_SHOW_FRAGMENT } from './graphql/fragments'
import { type MediaType } from '@/react/types'
import dayjs from '@/utils/dayjs'
import MediaImage from '../../components/MediaImage'

const GET_MEDIA = gql`
  query media($id: ID!, $type: String!) {
    media(id: $id, type: $type) {
      ... on Movie {
        ...MovieShowInfo
      }
      ... on Tv {
        ...TvShowInfo
      }
    }
  }
  ${MOVIE_SHOW_FRAGMENT}
  ${TV_SHOW_FRAGMENT}
`

const MediaShow = (): JSX.Element | null => {
  const { id, type } = useParams()

  const { data, loading } = useQuery(GET_MEDIA, {
    variables: { id, type }
  })

  console.log(data)

  const media: MediaType = data?.media

  if (loading) return null

  console.log(dayjs(media?.releaseDate))
  return (
    <Grid container spacing={0} className='media-show-grid'>
      <Grid item xs={2} className='media-poster'>
        <MediaImage imageUrl={media.posterPath} title={media.title} height='343px' width='228px' />
      </Grid>
      <Grid item xs={8} className='media-summary'>
        <h1>
          {media?.title} ({dayjs(media?.releaseDate, 'DD/MM/YYYY').year()})
        </h1>
        <p>
          {media?.releaseDate.toString()}
        </p>
      </Grid>
    </Grid>
  )
}

export default MediaShow
