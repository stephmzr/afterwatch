import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ACTIVITIES } from './queries'
import { useActivityPopover } from './hooks/useActivityPopover'
import ActivityHeader from './components/ActivityHeader'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import ActivityList from './components/ActivityList'
import MoviePopover from '../MediaPopover/MediaPopover'
import { type ActivityItem } from './types'

const Activity = (): JSX.Element => {
  const navigate = useNavigate()
  const {
    anchorEl,
    hoveredMovieId,
    handlePopoverOpen,
    handlePopoverClose
  } = useActivityPopover()

  // Fetch activities from GraphQL
  const { data, loading, error } = useQuery(GET_ACTIVITIES, {
    variables: { limit: 10 },
    fetchPolicy: 'cache-and-network'
  })

  const handleMovieClick = (movieId: string): void => {
    navigate(`/medias/movie/${movieId}`)
  }

  // Show loading state
  if (loading) {
    return <LoadingState />
  }

  // Show error state
  if (error) {
    return <ErrorState />
  }

  const activities = data?.activities || []

  return (
    <div>
      <ActivityHeader />
      <Box sx={{ mt: 2 }}>
        <ActivityList
          activities={activities}
          onMovieClick={handleMovieClick}
          onMovieHover={handlePopoverOpen}
          onMovieLeave={handlePopoverClose}
        />
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
