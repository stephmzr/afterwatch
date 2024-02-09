import React, { useContext, useState } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import styles from './index.module.sass';
import { DownOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { gql, useMutation, useQuery } from '@apollo/client';
import PasswordChangeModal from './PasswordChangeModal';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../../types';

type RightMenuProps = {
  theme?: 'light',
  logoutUrl: string;
}

const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      success
      flashMessages
    }
  }
`

const GET_PROFILE_QUERY = gql`
  query profile {
    profile {
      id
      email
      fullName
    }
  }
`;

const RightMenu: React.FC<RightMenuProps> = props => {
  const {
    logoutUrl
  } = props;
  const { data, loading, refetch } = useQuery(GET_PROFILE_QUERY);
  const user: UserType = data?.profile || {};
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION, {
    onCompleted: ({ updatePassword }) => {
      if(updatePassword.success) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  });

  const intl = useIntl();
  if (!user) return null;

  const overlay = (
    <Menu>
      <Menu.Item key="changePassword">
        <a
          className="item text-black"
          style={{ textDecoration: 'none' }}
          onClick={() => setPasswordVisible(true)}
        >
          {intl.formatMessage({ id: 'sentences.edit_password' })}
        </a>
      </Menu.Item>
      <Menu.Item key="logoutLink">
        <a
          className="item"
          style={{ textDecoration: 'none' }}
          href={logoutUrl}
          data-method="delete"
          role="option"
        >
          {intl.formatMessage({ id: 'words.sign_out' })}
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={[styles.rightMenuWrapper, 'user-menu'].join(' ')}>
      {passwordVisible && (
        <PasswordChangeModal
          onSubmit={(object) => updatePassword({ variables: { input: { attributes: object } }})}
          onClose={() => setPasswordVisible(false)}
        />
      )}
      <Dropdown key="userMenu" overlay={overlay}>
        <div>
          <Space>
            <div className={styles.userName}>{user.fullName}</div>
            <DownOutlined />
          </Space>
        </div>
      </Dropdown>
    </div>
  );
};

export default RightMenu;
