import React, { useState } from "react";
import { useIntl } from "react-intl";
import { UserType } from "../../types";

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
  })

  return (
    <>
    </>
    // <Card>
    //   <AntForm
    //     schema={ResetPasswordSchema}
    //     object={object}
    //     layout="vertical"
    //     // @ts-ignore
    //     onChange={onChange}
    //     onSubmit={onSubmit}
    //     submitText={intl.formatMessage({ id: 'sentences.reset_password' })}
    //     errors={errors}
    //   />
    // </Card>
  )
};

export default ResetPassword;