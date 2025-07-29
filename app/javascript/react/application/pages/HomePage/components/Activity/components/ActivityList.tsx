import React from 'react'
import { Stack, Box, Typography } from '@mui/material'
import { type ActivityItem } from '../types'
import ActivityItemComponent from './ActivityItem'

interface ActivityListProps {
  activities: ActivityItem[]
  onMovieClick: (movieId: string) => void
  onMovieHover: (event: React.MouseEvent<HTMLElement>, movieId: string) => void
  onMovieLeave: () => void
}

const ActivityList = ({
  activities,
  onMovieClick,
  onMovieHover,
  onMovieLeave
}: ActivityListProps): JSX.Element => {
  return (
    <Stack spacing={1}>
      {activities.map((activity) => (
        <ActivityItemComponent
          key={activity.id}
          activity={activity}
          onMovieClick={onMovieClick}
          onMovieHover={onMovieHover}
          onMovieLeave={onMovieLeave}
        />
      ))}
      
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
    </Stack>
  )
}

export default ActivityList 