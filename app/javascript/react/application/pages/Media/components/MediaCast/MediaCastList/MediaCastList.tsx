import { type CastType } from '@/react/types'
import useI18n from '@/utils/useI18n'
import React from 'react'
import MediaCastItem from '../MediaCastItem/MediaCastItem'
import MuiDivider from '@/react/application/components/MuiComponents/MuiDivider'
import { Stack, Typography } from '@mui/material'
import './MediaCastList.sass'

interface MediaCastListProps {
  cast: CastType[]
}

const MediaCastList: React.FC<MediaCastListProps> = (props): JSX.Element | null => {
  const { cast } = props
  const { t } = useI18n()
  return (
    <div>
      <Typography variant='h5' gutterBottom>{t('pages.media_show.casting')}</Typography>
      <MuiDivider style={{ borderColor: 'black' }} />
      <Stack gap={2} direction='row' className='cast-list'>
        {cast.map((actor) => (
          <MediaCastItem key={actor.id} actor={actor} />
        ))}
      </Stack>
    </div>
  )
}

export default MediaCastList
