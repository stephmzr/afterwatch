import useI18n from '@/utils/useI18n';
import React from 'react';
import ErrorPage from './ErrorPage';

const NotFound = () => {
  const { t } = useI18n();
  return (
    <ErrorPage
      code={404}
      message={t('pages.not_found.message')}
    />
  )
}

export default NotFound