import { memoOnlyForKeys, useI18n } from '@9troisquarts/wand';
import styled from '@emotion/styled'
import React from 'react';

const environments = ['staging', 'demo'];

const Banner = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 16px;
  background-color: #ffdf00;
  color: #df0000;
`

const EnvironmentBanner = ({ environment }) => {
  const { t } = useI18n();

  if (!environment || !environments.includes(environment)) return null;
  
  return (
    <Banner className="ntq-environment-banner">
      {t('sentences.environment_banner', { environment })}
    </Banner>
  )
}

export default React.memo(EnvironmentBanner, memoOnlyForKeys(['environment']))