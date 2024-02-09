import React from "react"
import { useI18n } from "@9troisquarts/wand"
import { UserOutlined } from "@ant-design/icons"
import InlineFilters from '@9troisquarts/inline-filters'

/*
 * UserIndexFilters Component
 */

type UserIndexFiltersProps = {
  search: any
  onReset: any
  onSearchChange: any
}

const UserIndexFilters: React.FC<UserIndexFiltersProps> = (props) => {

  const {
    search,
    onReset,
    onSearchChange
  } = props

  /*
   * Hooks
   */

  const { t } = useI18n()

  /*
   * Misc
   */

  const schema = [
    {
      name: 'indexedFullNameICont',
      icon: <UserOutlined />,
      title: t('activerecord.attributes.user.full_name'),
      toggleable: false,
      style: {
        width: 300,
      },
      input: {
        type: 'string',
        inputProps: {
          placeholder: t('pages.user.index.search_placeholder')
        }
      }
    }
  ]

  /*
   * Render
   */

  return (
    <div>
      <InlineFilters
        defaultValue={search}
        onReset={onReset}
        resetText={t('sentences.reset_filters')}
        onChange={(object) => {
          onSearchChange(object)
        }}
        // @ts-ignore
        schema={schema}
        toggle={false}
      />
    </div>
  )

}

export default UserIndexFilters