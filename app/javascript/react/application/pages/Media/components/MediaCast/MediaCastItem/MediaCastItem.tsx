import { type CastType } from '@/react/types'
import React from 'react'
import './MediaCastItem.sass'
import { CardContent, CardMedia, Typography } from '@mui/material'
import MuiCard from '@/react/application/components/MuiComponents/MuiCard'
import { imageBaseUrl } from '@/utils/imageBaseUrl'

const MediaCastItem = ({ actor }: { actor: CastType }): JSX.Element => {
  return (
    <MuiCard sx={{ width: 180 }}>
      <CardMedia
        sx={{ height: '60%' }}
        component="img"
        src={`${imageBaseUrl}/${actor.profilePath}`}
        title={actor.name}
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div" className='actor-name'>
          {actor.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className='character-name'>
          {actor.character}
        </Typography>
      </CardContent>
    </MuiCard>
  )
}

export default MediaCastItem
