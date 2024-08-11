import MuiDivider from '@/react/application/components/MuiComponents/MuiDivider'
import useI18n from '@/utils/useI18n'
import { Typography } from '@mui/material'
import React from 'react'
import './MediaSynopsis.sass'

const MediaSynospis = ({ synopsis }: { synopsis: string }): JSX.Element => {
  const { t } = useI18n()
  return (
    <>
      <Typography variant='h5' gutterBottom>{t('pages.media_show.synopsis')}</Typography>
      <MuiDivider style={{ borderColor: 'black' }} />
      <Typography variant="body1" sx={{ margin: '18px 0' }}>{synopsis}</Typography>
    </>
  )
}

export default MediaSynospis
