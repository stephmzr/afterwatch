import { useIntl } from 'react-intl'

const useI18n = () => {
  const intl = useIntl()
  const t = (key, args: any = {}) => {
    let k = key
    if (args && args.count !== undefined) {
      let pluralKey = 'zero'
      if (args.count > 1) pluralKey = 'other'
      else if (args.count === 1) pluralKey = 'one'
      k = `${key}.${pluralKey}`
    }
    return intl.formatMessage({ id: k }, args)
  }
  const tAttribute = (modelName, attributeName) => intl.formatMessage({ id: `active_record.attributes.${modelName}.${attributeName}` })
  return {
    t,
    translate: t,
    tAttribute
  }
}

export default useI18n
