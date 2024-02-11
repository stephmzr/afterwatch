import useI18n from '@/utils/useI18n';
import React from 'react';
import ErrorPage from './ErrorPage';

const InternalServerError = () => {
  const { t } = useI18n();
  return (
    <ErrorPage
      code={500}
      message={t('pages.internal_server_error.message')}
    />
  )
}

export default InternalServerError;