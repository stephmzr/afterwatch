import useI18n from '@/utils/useI18n'
import React from 'react'
import MuiDivider from '@components/MuiComponents/MuiDivider'

const TrendingMovies = (): JSX.Element => {
  const { t } = useI18n()
  return (
    <div>
      <h2 className='is-bold'>{t('pages.home_page.trending_movies')}</h2>
      <MuiDivider style={{ borderColor: 'black' }} />
    </div>
  )
}

export default TrendingMovies
