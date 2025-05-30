import React, { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Stack, Avatar, Popover } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import VisibilityIcon from '@mui/icons-material/Visibility'
import MediaImage from '@/react/application/components/MediaImage/MediaImage'
import MediaRating from '@/react/application/components/MediaRating'
import dayjs from '@/utils/dayjs'
import useI18n from '@/utils/useI18n'
import MuiDivider from '@/react/application/components/MuiComponents/MuiDivider'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar: string
  }
  type: 'rating' | 'watchlist' | 'watched'
  movie: {
    id: string
    title: string
    posterPath: string
    releaseDate: string
    voteAverage: number
  }
  value?: number
  createdAt: string
}

// Données simulées pour l'activité des amis
const mockActivity: ActivityItem[] = [
  {
    id: '1',
    user: { name: 'Marie Dupont', avatar: 'M' },
    type: 'rating',
    movie: {
      id: '872585',
      title: 'Oppenheimer',
      posterPath: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      releaseDate: '2023-07-21',
      voteAverage: 8.3
    },
    value: 5,
    createdAt: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    user: { name: 'Jean Martin', avatar: 'J' },
    type: 'watchlist',
    movie: {
      id: '693134',
      title: 'Dune: Part Two',
      posterPath: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      releaseDate: '2024-02-29',
      voteAverage: 8.5
    },
    createdAt: '2024-01-15T10:15:00Z'
  },
  {
    id: '3',
    user: { name: 'Sophie Bernard', avatar: 'S' },
    type: 'watched',
    movie: {
      id: '414906',
      title: 'The Batman',
      posterPath: '/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
      releaseDate: '2022-03-04',
      voteAverage: 7.8
    },
    createdAt: '2024-01-14T20:45:00Z'
  },
  {
    id: '4',
    user: { name: 'Alex Rousseau', avatar: 'A' },
    type: 'rating',
    movie: {
      id: '76600',
      title: 'Avatar: The Way of Water',
      posterPath: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      releaseDate: '2022-12-16',
      voteAverage: 7.6
    },
    value: 4,
    createdAt: '2024-01-14T16:20:00Z'
  },
  {
    id: '5',
    user: { name: 'Emma Leroy', avatar: 'E' },
    type: 'watchlist',
    movie: {
      id: '346698',
      title: 'Barbie',
      posterPath: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
      releaseDate: '2023-07-21',
      voteAverage: 7.1
    },
    createdAt: '2024-01-13T11:30:00Z'
  }
]

const getActivityIcon = (type: string): React.ReactElement | null => {
  switch (type) {
    case 'rating': return <StarIcon sx={{ fontSize: 18, color: 'warning.main' }} />
    case 'watchlist': return <BookmarkIcon sx={{ fontSize: 18, color: 'primary.main' }} />
    case 'watched': return <VisibilityIcon sx={{ fontSize: 18, color: 'success.main' }} />
    default: return null
  }
}

const getActivityText = (item: ActivityItem): string => {
  switch (item.type) {
    case 'rating': return `a attribué ${item.value}/5 au film`
    case 'watchlist': return 'a ajouté à sa watchlist'
    case 'watched': return 'a regardé'
    default: return ''
  }
}

interface MoviePopoverProps {
  movie: ActivityItem['movie']
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

  return (
    <div>
      <div className='subtitle'>{t('pages.home_page.activity').toLocaleUpperCase()}</div>
      <MuiDivider style={{ borderColor: 'black' }} className='subtitle-divider'/>
      <Box sx={{ mt: 2 }}>
        <Stack spacing={1}>
          {mockActivity.map((activity) => (
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
                  imageUrl={activity.movie.posterPath}
                  height='80px'
                  width='53px'
                  renderType='w154'
                  borderRadius={6}
                />
                <Box sx={{ mt: 1 }}>
                  {getActivityIcon(activity.type)}
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
                    {activity.user.avatar}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {activity.user.name} {getActivityText(activity)}{' '}
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                        onClick={() => { handleMovieClick(activity.movie.id) }}
                        onMouseEnter={(event) => { handlePopoverOpen(event, activity.movie.id) }}
                        onMouseLeave={handlePopoverClose}
                      >
                        {activity.movie.title} ({dayjs(activity.movie.releaseDate).year()})
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
        const hoveredActivity = mockActivity.find(activity => activity.movie.id === hoveredMovieId)
        return hoveredActivity
          ? (
              <MoviePopover
                movie={hoveredActivity.movie}
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
