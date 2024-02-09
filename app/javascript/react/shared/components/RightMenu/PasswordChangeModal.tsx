import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import { Modal } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const PasswordChangeModal = props => {
  const {
    onSubmit,
    onClose
  } = props;
  const intl = useIntl();
  const { object, set, onChange } = useAntForm({ });
  const handleSubmit = () => onSubmit(object);
  return (
    <Modal
      visible
      title={intl.formatMessage({ id: 'sentences.edit_password' })}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={intl.formatMessage({ id: 'words.save' })}
      cancelText={intl.formatMessage({ id: 'words.cancel' })}
    >
      <AntForm
        object={object}
        // @ts-ignore
        onChange={onChange}
        schema={[
          {
            name: 'currentPassword',
            label: intl.formatMessage({ id: 'words.current_password' }),
            input: {
              type: 'password'
            }
          },
          {
            name: 'password',
            label: intl.formatMessage({ id: 'words.password' }),
            input: {
              type: 'password'
            }
          },
          {
            name: 'passwordConfirmation',
            label: intl.formatMessage({ id: 'words.password_confirmation' }),
            input: {
              type: 'password'
            }
          },
        ]}
      />
    </Modal>
  )
};

export default PasswordChangeModal
