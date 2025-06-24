import React, { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Stack, Avatar, Popover } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import MediaImage from '@/react/application/components/MediaImage/MediaImage'
import MediaRating from '@/react/application/components/MediaRating'
import dayjs from '@/utils/dayjs'
import useI18n from '@/utils/useI18n'
import MuiDivider from '@/react/application/components/MuiComponents/MuiDivider'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import { gql, useQuery } from '@apollo/client'

const GET_ACTIVITIES = gql`
  query activities($limit: Int) {
    activities(limit: $limit) {
      id
      activityType
      tmdbId
      mediaType
      metadata
      createdAt
      actionText
      user {
        id
        firstName
        lastName
        fullName
      }
      media {
        ... on Movie {
          id
          title
          posterPath
          releaseDate
          voteAverage
        }
        ... on Tv {
          id
          title: name
          posterPath
          releaseDate: firstAirDate
          voteAverage
        }
      }
    }
  }
`

interface ActivityItem {
  id: string
  user: {
    id: string
    firstName: string
    lastName: string
    fullName: string
  }
  activityType: 'rating' | 'watchlist'
  tmdbId: string
  mediaType: string
  metadata: any
  createdAt: string
  actionText: string
  media: {
    id: string
    title: string
    posterPath: string
    releaseDate: string
    voteAverage: number
  }
}

const getActivityIcon = (type: string): React.ReactElement | null => {
  switch (type) {
    case 'rating': return <StarIcon sx={{ fontSize: 18, color: 'warning.main' }} />
    case 'watchlist': return <BookmarkIcon sx={{ fontSize: 18, color: 'primary.main' }} />
    default: return null
  }
}

interface MoviePopoverProps {
  movie: ActivityItem['media']
  anchorEl: HTMLElement | null
  onClose: () => void
}

const MoviePopover = ({ movie, anchorEl, onClose }: MoviePopoverProps): JSX.Element => {
  const open = Boolean(anchorEl)

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      sx={{
        pointerEvents: 'none',
        '& .MuiPopover-paper': {
          width: 'fit-content',
          bgcolor: 'background.paper',
          boxShadow: 24,
          pt: 1,
          pb: 1,
          pl: 2,
          pr: 2,
          borderRadius: 2
        }
      }}
    >
      <Box>
        <Stack direction="row" spacing={2}>
          {/* Poster */}
          <MediaImage
            imageUrl={movie.posterPath}
            height='120px'
            width='80px'
            renderType='w500'
          />

          <Stack spacing={2} sx={{ flex: 1, justifyContent: 'space-between' }}>
            {/* Title and Year */}
            <Stack spacing={0}>
              <Typography variant="h6" component="h5" sx={{ fontWeight: 600 }}>
                {movie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dayjs(movie.releaseDate).year()}
              </Typography>
            </Stack>
            <Box sx={{ alignSelf: 'flex-end' }}>
              <MediaRating rating={movie.voteAverage} />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Popover>
  )
}

const Activity = (): JSX.Element => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null)

  // Fetch activities from GraphQL
  const { data, loading, error } = useQuery(GET_ACTIVITIES, {
    variables: { limit: 10 },
    fetchPolicy: 'cache-and-network'
  })

  const debouncedSetAnchorEl = useCallback(
    debounce((element: HTMLElement | null) => {
      setAnchorEl(element)
    }, 500),
    []
  )

  useEffect(() => {
    return () => {
      debouncedSetAnchorEl.cancel()
    }
  }, [debouncedSetAnchorEl])

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, movieId: string): void => {
    setHoveredMovieId(movieId)
    debouncedSetAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = (): void => {
    setHoveredMovieId(null)
    debouncedSetAnchorEl(null)
  }

  const handleMovieClick = (movieId: string): void => {
    navigate(`/medias/movie/${movieId}`)
  }

  // Show loading state
  if (loading) {
    return (
      <div>
        <div className='subtitle'>{t('pages.home_page.activity').toLocaleUpperCase()}</div>
        <MuiDivider style={{ width: '20%' }} className='subtitle-divider'/>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Chargement des activités...
          </Typography>
        </Box>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div>
        <div className='subtitle'>{t('pages.home_page.activity').toLocaleUpperCase()}</div>
        <MuiDivider style={{ width: '20%' }} className='subtitle-divider'/>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="error">
            Erreur lors du chargement des activités
          </Typography>
        </Box>
      </div>
    )
  }

  const activities = data?.activities || []

  return (
    <div>
      <div className='subtitle'>{t('pages.home_page.activity').toLocaleUpperCase()}</div>
      <MuiDivider style={{ width: '20%' }} className='subtitle-divider'/>
      <Box sx={{ mt: 2 }}>
        <Stack spacing={1}>
          {activities.map((activity: ActivityItem) => (
            <Box
              key={activity.id}
              sx={{
                display: 'flex',
                p: 2,
                borderRadius: 2,
                bgcolor: 'grey.50',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'grey.100',
                  borderColor: 'grey.300'
                }
              }}
            >
              {/* Poster du film et icône */}
              <Box sx={{ mr: 2, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <MediaImage
                  imageUrl={activity.media.posterPath}
                  height='80px'
                  width='53px'
                  renderType='w154'
                  borderRadius={6}
                />
                <Box sx={{ mt: 1 }}>
                  {getActivityIcon(activity.activityType)}
                </Box>
              </Box>

              {/* Contenu principal */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* Ligne du haut : Utilisateur et action */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: '0.8rem',
                      mr: 1.5,
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontWeight: 600
                    }}
                  >
                    {activity.user.firstName.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {activity.user.fullName} {activity.actionText}{' '}
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                        onClick={() => { handleMovieClick(activity.media.id) }}
                        onMouseEnter={(event) => { handlePopoverOpen(event, activity.media.id) }}
                        onMouseLeave={handlePopoverClose}
                      >
                        {activity.media.title} ({dayjs(activity.media.releaseDate).year()})
                      </Typography>
                    </Typography>
                  </Box>
                </Box>

                {/* Ligne du bas : Date */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {dayjs(activity.createdAt).format('DD/MM/YYYY à HH:mm')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Lien "Voir plus" */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Voir plus d&apos;activités
          </Typography>
        </Box>
      </Box>

      {/* Popover pour le titre du film */}
      {hoveredMovieId && (() => {
        const hoveredActivity = activities.find((activity: ActivityItem) => activity.media.id === hoveredMovieId)
        return hoveredActivity
          ? (
              <MoviePopover
                movie={hoveredActivity.media}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
              />
            )
          : null
      })()}
    </div>
  )
}

export default Activity
