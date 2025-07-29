import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import dayjs from '@/utils/dayjs'
import MediaImage from '@/react/application/components/MediaImage/MediaImage'
import { getActivityIcon } from '../utils'
import { type ActivityItem as ActivityItemType } from '../types'

interface ActivityItemProps {
  activity: ActivityItemType
  onMovieClick: (movieId: string) => void
  onMovieHover: (event: React.MouseEvent<HTMLElement>, movieId: string) => void
  onMovieLeave: () => void
}

const ActivityItem = ({
  activity,
  onMovieClick,
  onMovieHover,
  onMovieLeave
}: ActivityItemProps): JSX.Element => {
  return (
    <Box
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
                onClick={() => { onMovieClick(activity.media.id) }}
                onMouseEnter={(event) => { onMovieHover(event, activity.media.id) }}
                onMouseLeave={onMovieLeave}
              >
                {activity.media.title} ({dayjs(activity.media.releaseDate, 'DD/MM/YYYY').year()})
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
  )
}

export default ActivityItem 