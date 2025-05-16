import { type CastType } from '@/react/types'
import useI18n from '@/utils/useI18n'
import React from 'react'
import MediaCastItem from '../MediaCastItem/MediaCastItem'
import MuiDivider from '@/react/application/components/MuiComponents/MuiDivider'
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import './MediaCastList.sass'
import MuiButton from '@/react/application/components/MuiComponents/MuiButton'
import { useLocation, useNavigate } from 'react-router-dom'

interface MediaCastListProps {
  cast: CastType[]
}

const MediaCastList: React.FC<MediaCastListProps> = (props): JSX.Element | null => {
  const { cast } = props
  const { t } = useI18n()
  const history = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <div>
      <div className='subtitle'>{t('pages.media_show.casting').toLocaleUpperCase()}</div>
      <MuiDivider style={{ borderColor: 'black' }} className='subtitle-divider'/>
      <Stack
        gap={2}
        direction={isSmallScreen ? 'column' : 'row'}
        className='cast-list'
      >
        {cast.map((actor) => (
          <MediaCastItem key={actor.id} actor={actor} />
        ))}
      </Stack>
      <div className='text-align-end'>
        <MuiButton variant='contained' onClick={() => { history(`${location.pathname}/cast`) }} sx={{ paddingTop: '10px' }}>
          {t('pages.media_show.show_more_cast')}
        </MuiButton>
      </div>
    </div>
  )
}

export default MediaCastList
