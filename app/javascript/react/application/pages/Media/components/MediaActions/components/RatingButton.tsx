import React from 'react'
import { Button, IconButton, Tooltip } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

interface RatingButtonProps {
  hasRated: boolean
  onClick: () => void
  variant?: 'button' | 'icon'
  showTooltip?: boolean
  tooltipTitle?: string
  color?: string
  sx?: any
}

const RatingButton: React.FC<RatingButtonProps> = ({
  hasRated,
  onClick,
  variant = 'button',
  showTooltip = false,
  tooltipTitle,
  color,
  sx
}) => {
  const buttonContent = variant === 'button' ? (
    <Button
      variant={hasRated ? 'contained' : 'outlined'}
      startIcon={<StarIcon />}
      onClick={onClick}
      color="warning"
      sx={sx}
    >
      {hasRated ? 'Modifier ma note' : 'Noter'}
    </Button>
  ) : (
    <IconButton onClick={onClick} sx={sx}>
      <StarIcon />
    </IconButton>
  )

  if (showTooltip && tooltipTitle) {
    return (
      <Tooltip title={tooltipTitle}>
        {buttonContent}
      </Tooltip>
    )
  }

  return buttonContent
}

export default RatingButton
