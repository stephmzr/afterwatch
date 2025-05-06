import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import MuiDivider from '../../components/MuiComponents/MuiDivider'
import useI18n from '@/utils/useI18n'
import './styles/Cast.sass'

const Cast = (): JSX.Element => {
  const { t } = useI18n()

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Grid container spacing={0} className='cast-container'>
      <Grid item xl={2} sm={3}>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="CAST" />
        <Tab label="EQUIPE TECHNIQUE" />
        <Tab label="DETAILS" />
        <Tab label="SORTIES" />
      </Tabs>
    </Box>
      </Grid>
      <Grid item sm={6} xl={4}>
        {/* <div className='subtitle'>{t('pages.media_show.casting').toLocaleUpperCase()}</div>
        <MuiDivider style={{ borderColor: 'black' }} className='subtitle-divider'/> */}
      </Grid>
    </Grid>
  )
}

export default Cast
