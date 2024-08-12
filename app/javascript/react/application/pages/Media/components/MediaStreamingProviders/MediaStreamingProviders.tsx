import useI18n from '@/utils/useI18n'
import { Box, Typography } from '@mui/material'
import React from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube'
import './MediaStreamingProviders.sass'

const MediaStreamingProviders = (): JSX.Element => {
  const { t } = useI18n()
  return (
      <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '6px',
        overflow: 'hidden',
        width: '228px',
        maxWidth: '228px',
        margin: '24px auto'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderBottom: '1px solid #ccc',
          padding: '8px 16px',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Typography variant='body2' color='primary'>{t('pages.media_show.where_to_watch')}</Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          borderBottom: '1px solid #ccc',
          padding: '8px 16px'
        }}
      >
        <Typography variant="body2">
          <YouTubeIcon/>&nbsp;
        </Typography>
      </Box>
      <Box
        sx={{
          borderBottom: '1px solid #ccc',
          padding: '8px 16px'
        }}
      >
        <Typography variant="body2">
          <YouTubeIcon/>&nbsp;
        </Typography>
      </Box>
      <Box
        sx={{
          borderBottom: '1px solid #ccc',
          padding: '8px 16px'
        }}
      >
        <Typography variant="body2">
          <YouTubeIcon/>&nbsp;
        </Typography>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          padding: '8px 16px',
          backgroundColor: '#f5f5f5'
        }}
        className='footer'
      >
        <span className='youtube-link' >
          <YouTubeIcon/>&nbsp;
          <Typography variant="body2">Trailer</Typography>
        </span>
      </Box>
    </Box>
  )
}

export default MediaStreamingProviders
