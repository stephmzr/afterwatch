import React, { useState } from 'react';
import { Table, Button } from 'antd';
import dayjs from 'dayjs';
import { useTitle } from 'ahooks';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useI18n, useTableList } from '@9troisquarts/wand';
import styles from './index.module.sass'
import UserIndexFilters from './components/Filters';
import { SEARCH_USERS_DEFINITION, USERS_QUERY } from '../../../../../utils/hooks/useUser';
import { UserType } from '../../../../types';
import UserEdit from '../Edit';

/*
 * UsersIndex component
 */

const Users = () => {

  /*
   * Hooks
   */

  const {
    t,
    tAttribute
  } = useI18n()

  useTitle(`${t('menu.users')}`)

  const {
    records: users,
    refetch: refetchUsers,
    loading: usersLoading,
    search,
    onSearchChange,
    onReset: onResetSearch,
    pagination,
  } = useTableList<UserType>('users',
    {
      query: USERS_QUERY,
      paginate: true
    }, {
      definition: SEARCH_USERS_DEFINITION,
      history: () => {
        replace: (url) => undefined
      },
      updateLocation: false,
      key: 'users',
    }
  )
    
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>(undefined)

  /*
   * Functions
   */

  const onNewUser = () => {
    setEditModalVisible(true)
  }

  const onEditUser = (user: UserType) => {
    setEditModalVisible(true)
    setSelectedUser(user)
  }

  const onSuccessEditUser = (user: UserType) => {
    setEditModalVisible(false)
    setSelectedUser(undefined)
    refetchUsers()
  }

  const onCancelEditUser = () => {
    setEditModalVisible(false)
    setSelectedUser(undefined)
  }

  /*
   * Misc
   */

  const columns = [
    {
      title: t('activerecord.attributes.user.full_name'),
      dataIndex: 'fullName',
    },
    {
      title: tAttribute('user', 'email'),
      dataIndex: 'email',
    },
    {
      title: tAttribute('user', 'active'),
      dataIndex: 'active',
      align: 'center',
      render: (active) => active ? <CheckOutlined /> : <CloseOutlined />
    },
    {
      title: t('activerecord.attributes.user.current_sign_in_at'),
      dataIndex: 'lastRequestAt',
      align: 'right',
      render: (lastRequestAt: string) =>
        lastRequestAt ? dayjs(lastRequestAt).format('LLL') : null,
    }
  ]

  /*
   * Render
   */

  return (
    <div className={styles.componentContainer}>
      <UserEdit
        visible={editModalVisible}
        user={selectedUser}
        onSuccess={onSuccessEditUser}
        onCancel={onCancelEditUser}
      />
      <div className={styles.header}>
        <h1 className='h1-regular'>
          { t('menu.users') }
        </h1>
        <Button
          id="newUser"
          key="new"
          type='primary'
          icon={<PlusOutlined />}
          onClick={onNewUser}
          style={{ marginLeft: 28 }}
        >
          { t('pages.user.index.new_user') }
        </Button>
      </div>
      <div>
        <UserIndexFilters
          search={search}
          onReset={onResetSearch}
          onSearchChange={onSearchChange}
        />
      </div>
      <div className={styles.usersCount}>
        { t('activerecord.attributes.user.pagination.users_found', { count: pagination?.total || 0 }) }
      </div>
      <Table
        size="small"
        key="users-table"
        loading={usersLoading}
        // @ts-ignore
        columns={columns}
        dataSource={users}
        rowKey="id"
        onRow={(record: UserType) => {
          return {
            onClick: () => {
              onEditUser(record)
            }
          }
        }}
      />
    </div>
  )
}

export default Users;