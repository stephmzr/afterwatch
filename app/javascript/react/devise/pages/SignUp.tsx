import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { type UserType } from '../../types'
import { castAttributesFromDefinition, type ModelDefinitionType } from '@/utils/useI18n'

import axiosClient from '../../../utils/axiosClient'

interface SignUpProps {
  user: UserType
  errors: any
}

const userDefinition: ModelDefinitionType = {
  firstName: 'String',
  lastName: 'String',
  password: 'Password',
  passwordConfirmation: 'Password',
  email: 'String'
}

const SignUp: React.FC<SignUpProps> = props => {
  const {
    user
  } = props
  const intl = useIntl()

  const createUser = async (user) => {
    await axiosClient.post('/users', {
      user: { ...user }
    }).then(() => { window.location.replace('/') })
  }

  const onSubmit = () => {
  }

  const signUpSchema: AntSchema = [
    [
      {
        name: 'firstName',
        label: intl.formatMessage({ id: 'words.first_name' }),
        input: {
          type: 'string'
        },
        colProps: {
          xs: 24,
          md: 12
        }
      },
      {
        name: 'lastName',
        label: intl.formatMessage({ id: 'words.last_name' }),
        input: {
          type: 'string'
        },
        colProps: {
          xs: 24,
          md: 12
        }
      }
    ],
    {
      name: 'email',
      label: intl.formatMessage({ id: 'words.email' }),
      input: {
        type: 'string'
      },
      colProps: {
        xs: 24,
        md: 12
      }
    },
    [
      {
        name: 'password',
        label: intl.formatMessage({ id: 'words.password' }),
        input: {
          type: 'password'
        },
        colProps: {
          xs: 24,
          md: 12
        }
      },
      {
        name: 'passwordConfirmation',
        label: intl.formatMessage({ id: 'words.password_confirmation' }),
        input: {
          type: 'password'
        },
        colProps: {
          xs: 24,
          md: 12
        }
      }
    ],
    {
      name: 'phone',
      label: intl.formatMessage({ id: 'words.phone_number' }),
      input: {
        type: 'string'
      },
      colProps: {
        xs: 24,
        md: 12
      }
    }
  ]

  // return (
    // <Card>
    //   <AntForm
    //     schema={signUpSchema}
    //     object={object}
    //     layout="vertical"
    //     id="signUpForm"
    //     // @ts-expect-error
    //     onChange={onChange}
    //     onSubmit={onSubmit}
    //     errors={errors}
    //   />
    // </Card>
 //)
}

export default SignUp
