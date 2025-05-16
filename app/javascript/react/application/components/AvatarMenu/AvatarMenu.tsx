import { type UserType } from '@/react/types'
import useI18n from '@/utils/useI18n'
import Logout from '@mui/icons-material/Logout'
import { Avatar, Menu, MenuItem, Typography, ListItemIcon } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AvatarMenuProps {
  user: UserType
}

const AvatarMenu: React.FC<AvatarMenuProps> = (props) => {
  const { user } = props
  const { t } = useI18n()
  const history = useNavigate()
  const onRouteChange = (key) => { history(key) }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
        <Avatar
        onClick={handleAvatarClick}
        sx={{ cursor: 'pointer' }}
      >
        {user.first_name?.charAt(0)}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        disableAutoFocusItem
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 24,
                height: 24,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
      >
        <MenuItem onClick={() => { onRouteChange('/profile'); handleMenuClose() }}>
          <ListItemIcon>
            <Avatar />
          </ListItemIcon>
          <Typography fontSize={16}>{t('words.profile')}</Typography>
        </MenuItem>
        <MenuItem onClick={() => { onRouteChange('/sign_out'); handleMenuClose() }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography fontSize={16}>{t('words.sign_out')}</Typography>
        </MenuItem>
      </Menu>
    </>

  )
}

export default AvatarMenu
