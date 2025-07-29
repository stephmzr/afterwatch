import React from 'react'
import MuiDivider from '@/react/application/components/MuiComponents/MuiDivider'
import useI18n from '@/utils/useI18n'

const ActivityHeader = (): JSX.Element => {
  const { t } = useI18n()

  return (
    <>
      <div className='subtitle'>{t('pages.home_page.activity').toLocaleUpperCase()}</div>
      <MuiDivider style={{ width: '20%' }} className='subtitle-divider'/>
    </>
  )
}

export default ActivityHeader 