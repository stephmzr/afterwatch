import React from 'react'
import { Box, Typography } from '@mui/material'
import MuiDivider from '@/react/application/components/MuiComponents/MuiDivider'
import useI18n from '@/utils/useI18n'

const ErrorState = (): JSX.Element => {
  const { t } = useI18n()

  return (
    <div>
      <div className='subtitle'>{t('pages.home_page.activity').toLocaleUpperCase()}</div>
      <MuiDivider style={{ width: '20%' }} className='subtitle-divider'/>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="error">
          Erreur lors du chargement des activités
        </Typography>
      </Box>
    </div>
  )
}

export default ErrorState 