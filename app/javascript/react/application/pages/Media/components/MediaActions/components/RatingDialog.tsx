import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
  Typography,
  Rating,
  TextField
} from '@mui/material'

interface RatingDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  rating: number | null
  review: string
  onRatingChange: (rating: number | null) => void
  onReviewChange: (review: string) => void
  mediaTitle: string
}

const RatingDialog: React.FC<RatingDialogProps> = ({
  open,
  onClose,
  onSubmit,
  rating,
  review,
  onRatingChange,
  onReviewChange,
  mediaTitle
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Noter {mediaTitle}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Votre note
            </Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => onRatingChange(newValue)}
              size="large"
              max={10}
            />
            <Typography variant="body2" color="text.secondary">
              {rating ? `${rating}/10` : 'Sélectionnez une note'}
            </Typography>
          </Box>

          <TextField
            label="Commentaire (optionnel)"
            multiline
            rows={4}
            value={review}
            onChange={(e) => onReviewChange(e.target.value)}
            placeholder="Partagez votre avis sur ce film..."
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Annuler
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={!rating}
        >
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RatingDialog
