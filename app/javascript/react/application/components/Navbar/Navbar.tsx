import React from 'react'
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Stack
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { type UserType } from '@/react/types'
import useI18n from '@/utils/useI18n'
import AvatarMenu from '../AvatarMenu/AvatarMenu'
import SearchBar from '../SearchBar/SearchBar'

interface NavbarProps {
  user: UserType
}

const Navbar = ({ user }: NavbarProps): JSX.Element => {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Container maxWidth="lg" disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {/* Logo */}
            <Typography
              variant="h5"
              component="div"
              onClick={() => { navigate('/') }}
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                },
                mr: 4,
                flexShrink: 0
              }}
            >
              Afterwatch
            </Typography>

            {/* Search Bar */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: 2 }}>
              <SearchBar
                maxWidth="500px"
                perPage={12}
              />
            </Box>

            {/* Navigation Links */}
            <Stack direction="row" spacing={3} alignItems="center" sx={{ flexShrink: 0 }}>
              <Typography
                variant="body1"
                onClick={() => { navigate('/movies') }}
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#4ecdc4' }
                }}
              >
                {t('words.movies')}
              </Typography>
              <Typography
                variant="body1"
                onClick={() => { navigate('/tv') }}
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#4ecdc4' }
                }}
              >
                {t('words.tv')}
              </Typography>
              <AvatarMenu user={user} />
            </Stack>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
