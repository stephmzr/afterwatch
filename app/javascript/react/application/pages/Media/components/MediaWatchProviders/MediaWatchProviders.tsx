import useI18n from '@/utils/useI18n'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube'
import './MediaWatchProviders.sass'
import { type ID } from '@/react/types'
import { imageBaseUrl } from '@/utils/imageBaseUrl'

interface MediaWatchProvidersProps {
  providers: {
    flatrate: Array<{
      id: ID
      providerName: string
      logoPath: string
    }>
  }
}

const MediaWatchProviders: React.FC<MediaWatchProvidersProps> = props => {
  const { providers } = props
  console.log(providers?.flatrate)
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
      {providers?.flatrate?.length > 0
        ? <Box
        key='flatrate-providers'
        sx={{
          borderBottom: '1px solid #ccc',
          padding: '8px 16px',
          display: 'flex'
        }}
      >
      <Grid container spacing={1}>
       {providers.flatrate.map((provider) => (
          <Grid item xs={3} key={provider.id}>
            <img src={`${imageBaseUrl.w45}/${provider.logoPath}`} alt={provider.providerName} className='provider-logo'/>
          </Grid>
       ))}
       </Grid>
      </Box>
        : (<Box
        sx={{
          borderBottom: '1px solid #ccc',
          padding: '8px 16px'
        }}
        >
          <Typography variant="body2">
            -
          </Typography>
        </Box>
          )}
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

export default MediaWatchProviders
