import React from 'react'
import { IntlProvider } from 'react-intl'
import { translations } from '../lang/translations'
import { defaultLocale } from '../lang/default'

const TranslationProvider = (WrappedComponent: any) => (props: any) => {
  // set locale and messages for IntlProvider.
  let locale = 'fr'
  if (props.user?.locale) locale = props.user?.locale
  if (props.locale) locale = props.locale
  const messages = {
    ...translations.en,
    ...translations[locale || defaultLocale]
  }
  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      <WrappedComponent {...props} />
    </IntlProvider>
  )
}

export default TranslationProvider
