import AntForm, { AntSchema, useAntForm } from '@9troisquarts/ant-form';
import { Card } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { UserType } from '../../types';
import { castAttributesFromDefinition, ModelDefinitionType } from '@9troisquarts/wand'
import axiosClient from '../../../utils/axiosClient';

type SignUpProps = {
  user: UserType;
  errors: any;
};

const userDefinition: ModelDefinitionType = {
  firstName: 'String',
  lastName: 'String',
  password: 'Password',
  passwordConfirmation: 'Password',
  email: 'String',
};

const SignUp: React.FC<SignUpProps> = props => {
  const {
    user,
  } = props;
  const intl = useIntl();
  const { object, onChange} = useAntForm(user || {});
  const [errors, setErrors] = useState<any | undefined>(undefined);

  const createUser = (user) => axiosClient.post('/users', {
    user: { ...user }
  }).then(() => ( window.location.replace('/')) )

  const onSubmit = () => {
    createUser(castAttributesFromDefinition(userDefinition, object));
  };

  const signUpSchema: AntSchema = [
    [
      {
        name: 'firstName',
        label: intl.formatMessage({ id: 'words.first_name' }),
        input: {
          type: 'string',
        },
        colProps: {
          xs: 24,
          md: 12,
        },
      },
      {
        name: 'lastName',
        label: intl.formatMessage({ id: 'words.last_name' }),
        input: {
          type: 'string',
        },
        colProps: {
          xs: 24,
          md: 12,
        },
      },
    ],
    {
      name: 'email',
      label: intl.formatMessage({ id: 'words.email' }),
      input: {
        type: 'string',
      },
      colProps: {
        xs: 24,
        md: 12,
      },
    },
    [
      {
        name: 'password',
        label: intl.formatMessage({ id: 'words.password' }),
        input: {
          type: 'password',
        },
        colProps: {
          xs: 24,
          md: 12,
        },
      },
      {
        name: 'passwordConfirmation',
        label: intl.formatMessage({ id: 'words.password_confirmation' }),
        input: {
          type: 'password',
        },
        colProps: {
          xs: 24,
          md: 12,
        },
      },
    ],
    {
      name: 'phone',
      label: intl.formatMessage({ id: 'words.phone_number' }),
      input: {
        type: 'string',
      },
      colProps: {
        xs: 24,
        md: 12,
      },
    },
  ]

  return (
    <Card>
      <AntForm
        schema={signUpSchema}
        object={object}
        layout="vertical"
        id="signUpForm"
        // @ts-ignore
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
      />
    </Card>
  );
}


export default SignUp;