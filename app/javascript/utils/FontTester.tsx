import React, { useState } from 'react'
import { Box, Typography, IconButton, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const FontTester = (): JSX.Element | null => {
  const [isVisible, setIsVisible] = useState(true)

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return null
  }

  const fontTests = [
    { weight: 100, name: 'Thin' },
    { weight: 200, name: 'ExtraLight' },
    { weight: 300, name: 'Light' },
    { weight: 400, name: 'Regular' },
    { weight: 500, name: 'Medium' },
    { weight: 600, name: 'SemiBold' },
    { weight: 700, name: 'Bold' },
    { weight: 800, name: 'ExtraBold' },
    { weight: 900, name: 'Black' }
  ]

  return (
    <Paper
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        width: 350,
        bgcolor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        p: 2,
        borderRadius: 2,
        zIndex: 9999,
        border: '1px solid #4CAF50'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600 }}>
          Inter Font Test
        </Typography>
        <IconButton
          size="small"
          onClick={() => { setIsVisible(false) }}
          sx={{ color: 'white' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {fontTests.map(({ weight, name }) => (
          <Typography
            key={weight}
            variant="body2"
            sx={{
              fontWeight: weight,
              fontSize: '14px',
              fontFamily: '"Inter", sans-serif'
            }}
          >
            {name} ({weight}): The quick brown fox jumps
          </Typography>
        ))}

        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
            mt: 1,
            borderTop: '1px solid #333',
            pt: 1
          }}
        >
          Regular Italic: The quick brown fox jumps
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: 'block',
          mt: 2,
          opacity: 0.7,
          fontSize: '11px'
        }}
      >
        Development mode only - Inter font family test
      </Typography>
    </Paper>
  )
}

export default FontTester 