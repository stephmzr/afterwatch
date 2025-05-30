import React from 'react'
import { Popover, Box, Typography, Stack, Chip, Menu } from '@mui/material'
import { type MovieType } from '@/react/types'
import dayjs from '@/utils/dayjs'
import MediaRating from '@/react/application/components/MediaRating'
import MediaImage from '@/react/application/components/MediaImage/MediaImage'

interface MoviePopoverProps {
  movie: MovieType
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
            {/* Title, Year and Director */}
            <Stack spacing={0}>
              <Typography variant="h6" component="h5" sx={{ fontWeight: 600 }}>
                {movie.title}
              </Typography>
              {movie.credits?.director && (
                <Typography variant="body2" color="text.secondary">
                  {movie.credits.director.name} - {dayjs(movie.releaseDate, 'DD/MM/YYYY').year()}
                </Typography>
              )}
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

export default MoviePopover
