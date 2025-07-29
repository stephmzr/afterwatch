import { type CastType } from '@/react/types'
import useI18n from '@/utils/useI18n'
import React, { useMemo } from 'react'
import MediaCastItem from '../MediaCastItem/MediaCastItem'
import MuiDivider from '@/react/application/components/MuiComponents/MuiDivider'
import { Stack, useMediaQuery, useTheme, Typography, Box } from '@mui/material'
import './MediaCastList.sass'
import MuiButton from '@/react/application/components/MuiComponents/MuiButton'
import { useLocation, useNavigate } from 'react-router-dom'

interface MediaCastListProps {
  cast: CastType[]
  maxItems?: number
}

const MediaCastList: React.FC<MediaCastListProps> = ({
  cast,
  maxItems = 6
}): JSX.Element | null => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  // Optimisation : limite le nombre d'acteurs affichés
  const displayedCast = useMemo(() =>
    cast.slice(0, maxItems),
    [cast, maxItems]
  )

  if (!cast || cast.length === 0) {
    return null
  }
  console.log(cast)
  return (
    <Box component="section" aria-labelledby="cast-section-title">
      <Typography
        id="cast-section-title"
        variant="h3"
        component="h2"
        className='subtitle'
        sx={{
          fontSize: '1.25rem',
          fontWeight: 600,
          mb: 1,
          letterSpacing: '0.5px'
        }}
      >
        {t('pages.media_show.casting').toLocaleUpperCase()}
      </Typography>

      <MuiDivider
        className='subtitle-divider'
      />

      {/* Container avec scroll horizontal sur mobile */}
      <Box
        className="cast-list-container"
        sx={{
          overflow: isSmallScreen ? 'auto' : 'visible',
          pb: isSmallScreen ? 1 : 0,
          '&::-webkit-scrollbar': {
            height: 6,
            borderRadius: 3
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 3
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 3
          }
        }}
      >
        <Stack
          gap={2}
          direction="row"
          className='cast-list'
          sx={{
            flexWrap: isSmallScreen ? 'nowrap' : 'wrap',
            minWidth: isSmallScreen ? 'fit-content' : 'auto',
            pb: isSmallScreen ? 1 : 0,
            alignItems: 'stretch'
          }}
          role="list"
          aria-label={t('pages.media_show.casting')}
        >
          {displayedCast.map((actor) => (
            <Box
              key={actor.id}
              role="listitem"
              sx={{
                minWidth: isSmallScreen ? '140px' : 'auto',
                flex: isSmallScreen ? '0 0 auto' : '1 1 calc(16.666% - 16px)',
                maxWidth: isSmallScreen ? '140px' : '180px',
                display: 'flex'
              }}
            >
              <MediaCastItem actor={actor} />
            </Box>
          ))}
        </Stack>
      </Box>
      <Box className='text-align-end' sx={{ mt: 2 }}>
        <MuiButton
          variant='outlined'
          onClick={() => { navigate(`${location.pathname}/cast`) }}
          sx={{
            paddingX: 3,
            paddingY: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: theme.shadows[4]
            },
            transition: 'all 0.2s ease-in-out'
          }}
          aria-label={`${t('pages.media_show.show_more_cast')} (${cast.length - maxItems} ${t('more')})`}
        >
          {t('pages.media_show.show_more_cast')}
        </MuiButton>
      </Box>
    </Box>
  )
}

export default MediaCastList
