import { useI18n } from '@9troisquarts/wand';
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