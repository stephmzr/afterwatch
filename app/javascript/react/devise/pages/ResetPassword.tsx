import AntForm, { AntSchema, useAntForm } from "@9troisquarts/ant-form";
import { Card } from "antd";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { UserType } from "../../types";
import { castAttributesFromDefinition } from "../../../../utils/useI18n";

import axiosClient from '../../../utils/axiosClient';

type ResetPasswordProps = {
  user: UserType;
};

const userDefinition = {
  email: 'String',
};

const ResetPassword: React.FC<ResetPasswordProps> = props => {
  const {
    user,
  } = props;

  const resetPassword = (user: UserType) => axiosClient.post('/users/password', {
    user: { ...user }
  }).then(() => {
    window.location.replace('/')
  }).catch(err => {
    setErrors(err.errors)
  });

  const onSubmit = () => resetPassword(castAttributesFromDefinition(userDefinition, object));

  const { object, onChange } = useAntForm(user || { 'email': '' });
  const [errors, setErrors] = useState<any | undefined>(undefined);
  const intl = useIntl();
  const ResetPasswordSchema: AntSchema = [
    {
      name: 'email',
      label: intl.formatMessage({ id: 'words.email' }),
      input: {
        type: 'string',
      },
      colProps: {
        xs: 24,
        md: 24,
      },
    }
  ]

  return (
    <Card>
      <AntForm
        schema={ResetPasswordSchema}
        object={object}
        layout="vertical"
        // @ts-ignore
        onChange={onChange}
        onSubmit={onSubmit}
        submitText={intl.formatMessage({ id: 'sentences.reset_password' })}
        errors={errors}
      />
    </Card>
  )
};

export default ResetPassword;