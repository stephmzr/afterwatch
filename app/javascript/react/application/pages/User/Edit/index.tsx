import AntForm, { useAntForm } from '@9troisquarts/ant-form'
import { useI18n } from '@9troisquarts/wand'
import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import useUser from '../../../../../utils/hooks/useUser'
import transformNestedErrorsToArray from '../../../../../utils/transformNestedErrorsToArray'

/*
 * UserEdit component
 */

const UserEdit = (props) => {

  const {
    visible,
    user,
    onSuccess,
    onCancel
  } = props

  /*
   * Hooks
   */

  const {
    t,
    tAttribute
  } = useI18n()

  const [errors, setErrors]: any = useState(undefined)

  const {
    object: userObject,
    set: setUserObject
  } = useAntForm({})

  const {
    onSave: onSaveUser,
    submitting
  } = useUser(user?.id);

  useEffect(() => {
    if (visible) {
      setUserObject(user)
    }
  }, [visible])

  /*
   * Functions
   */

  const onResetModal = () => {
    setErrors(undefined)
  }

  const onCloseModal = () => {
    onResetModal()
    if (typeof onCancel === 'function') {
      onCancel()
    }
  }

  const onChange = (_, allValues) => {
    setUserObject({
      ...userObject,
      ...allValues
    })
  }

  const onSubmit = () => {
    // @ts-ignore
    onSaveUser(userObject || {}, {
      onCompleted: (response) => {
        if (response?.recordErrors) {
          setErrors(transformNestedErrorsToArray(response?.recordErrors))
        } else {
          if (typeof onSuccess === 'function') {
            onResetModal()
            onSuccess(response?.createUser ? response?.createUser?.user : response?.updateUser?.user)
          }
        }
      }
    })
  }

  /*
   * Misc
   */

  const schema = [
    {
      label: tAttribute('user', 'first_name'),
      name: 'firstName',
      required: true,
      input: {
        type: 'string'
      }
    },
    {
      label: tAttribute('user', 'last_name'),
      name: 'lastName',
      required: true,
      input: {
        type: 'string'
      }
    },
    {
      label: tAttribute('user', 'email'),
      name: 'email',
      required: true,
      input: {
        type: 'string'
      }
    },
    user?.id && {
      name: 'active',
      input: {
        type: 'boolean',
        inputProps: {
          text: 'Actif',
        },
      },
    },
  ]

  if (!visible) {
    return null
  }

  /*
   * Render
   */

  return (
    <Modal
      title={user ? t('pages.user.edit.title') : t('pages.user.new.title')}
      open={visible}
      closable={false}
      onOk={onSubmit}
      okButtonProps={{ loading: submitting }}
      onCancel={onCloseModal}
    >
      <AntForm
        // @ts-ignore
        schema={schema}
        object={userObject}
        onChange={onChange}
        errors={errors}
      />
    </Modal>
  )

}

export default UserEdit