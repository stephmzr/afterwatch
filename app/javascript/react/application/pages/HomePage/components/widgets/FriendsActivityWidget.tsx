import React from 'react'
import { Box, Typography, Card, CardContent, Stack, Avatar, Chip } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import VisibilityIcon from '@mui/icons-material/Visibility'
import MediaImage from '@/react/application/components/MediaImage/MediaImage'
import dayjs from '@/utils/dayjs'

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar: string
  }
  type: 'rating' | 'watchlist' | 'watched'
  movie: {
    title: string
    posterPath: string
    releaseDate: string
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
      title: 'Oppenheimer',
      posterPath: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      releaseDate: '2023-07-21'
    },
    value: 5,
    createdAt: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    user: { name: 'Jean Martin', avatar: 'J' },
    type: 'watchlist',
    movie: {
      title: 'Dune: Part Two',
      posterPath: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      releaseDate: '2024-02-29'
    },
    createdAt: '2024-01-15T10:15:00Z'
  },
  {
    id: '3',
    user: { name: 'Sophie Bernard', avatar: 'S' },
    type: 'watched',
    movie: {
      title: 'The Batman',
      posterPath: '/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
      releaseDate: '2022-03-04'
    },
    createdAt: '2024-01-14T20:45:00Z'
  },
  {
    id: '4',
    user: { name: 'Alex Rousseau', avatar: 'A' },
    type: 'rating',
    movie: {
      title: 'Avatar: The Way of Water',
      posterPath: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      releaseDate: '2022-12-16'
    },
    value: 4,
    createdAt: '2024-01-14T16:20:00Z'
  },
  {
    id: '5',
    user: { name: 'Emma Leroy', avatar: 'E' },
    type: 'watchlist',
    movie: {
      title: 'Barbie',
      posterPath: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
      releaseDate: '2023-07-21'
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
    case 'rating': return `a noté`
    case 'watchlist': return `a ajouté à sa watchlist`
    case 'watched': return `a regardé`
    default: return ''
  }
}

const FriendsActivityWidget = (): JSX.Element => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
            Activité récente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Découvrez les dernières interactions de la communauté
          </Typography>
        </Box>

        <Stack spacing={3}>
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
              {/* Poster du film */}
              <Box sx={{ mr: 2, flexShrink: 0 }}>
                <MediaImage
                  imageUrl={activity.movie.posterPath}
                  height='80px'
                  width='53px'
                  renderType='w154'
                  borderRadius={6}
                />
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
                      {activity.user.name} {getActivityText(activity)}
                    </Typography>
                  </Box>
                  {getActivityIcon(activity.type)}
                </Box>

                {/* Titre du film et année */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {activity.movie.title} ({dayjs(activity.movie.releaseDate).year()})
                </Typography>

                {/* Ligne du bas : Note et date */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    {activity.value && (
                      <Chip
                        icon={<StarIcon sx={{ fontSize: 16 }} />}
                        label={`${activity.value}/5`}
                        size="small"
                        color="warning"
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          bgcolor: 'warning.main',
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    )}
                  </Box>
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
            Voir plus d'activités
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FriendsActivityWidget 