import React from "react";
import { useIntl } from "react-intl";
import { UserType } from "../../../types";
import post from "../../../../utils/httpPost";
import { useI18n } from "@/utils/useI18n";

import { useNavigate } from 'react-router-dom'
import config from '../../../../config';
import styled from '@emotion/styled'
import googleLogo from './images/google-white.png';
import logo from '../../../../assets/images/logo.svg';

const Layout = styled.div`
  display: block;
  text-align: center;
  height: 100vh;
  background-color: #151412;
`

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LogoContainer = styled.div`
  display: block;
  > img {
    width: 200px;
    margin: 20px 0;
  }
`

const GoogleButton = styled.a`
  margin: 20px 0;
  padding: 8px 16px;
  background-color: #4688F1;
  color: #FFFFFF;
  display: inline-block;
  font-weight: bold;
  img {
    width: 24px;
    margin-right: 16px;
  }
  &:hover {
    color: #FFFFFF;
    background-color: lighten(#4688F1, 5%);
    transition: background-color linear 0.1s;
  }
`;

type SignInProps = {
  user: UserType;
  errors: any;
};

const env = process.env.NODE_ENV || 'development';

const userDefinition: ModelDefinitionType = {
  email: 'String',
  password: 'Password',
};

type Provider = 'google'

const redirectToSSO = (provider: Provider) => {
  const providerConfig = config.authentication?.providers[provider].environments[env];
  window.location.href = `${providerConfig.authUrl}`;
};

const SignIn: React.FC<SignInProps> = props => {
  const {
    user,
    errors,
  } = props;
  const { t } = useI18n();

  const signInUser = (user: UserType) => post('/users/sign_in', {
    ...user
  }, "user")
  const history = useNavigate();

  const onSubmit = () => {
    signInUser(castAttributesFromDefinition(userDefinition, object));
  };

  const { object, onChange } = useAntForm(user || {});
  const intl = useIntl();

  const SignInSchema: AntSchema = [
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
    },
    {
      name: 'password',
      label: intl.formatMessage({ id: 'words.password' }),
      input: {
        type: 'password',
      },
      colProps: {
        xs: 24,
        md: 24,
      },
    },
  ]

  return (
    <Layout>
      {/* <Container>
        <LogoContainer>
          <img src={logo} />
        </LogoContainer>
        <Space direction="vertical">
          {config.authentication?.providers?.email?.enable && (
            <Row>
              <AntForm
                schema={SignInSchema}
                object={object}
                layout="vertical"
                // @ts-ignore
                onChange={onChange}
                onSubmit={onSubmit}
                errors={errors}
                submitText={intl.formatMessage({ id: 'words.login' })}
                actionsWrapperProps={{
                  className: 'ant-form-actions-wrapper'
                }}
                extraActions={[
                  <Button type='link' onClick={() => history('/users/reset_password')}>
                    {t('sentences.forgotten_password')}
                  </Button>
                ]}
              />
            </Row>
          )}
          {config.authentication?.providers?.google?.enable  && (
            <Row>
              <Col xs={24}>
                <GoogleButton onClick={() => redirectToSSO('google')}>
                  <img src={googleLogo} />
                  Sign in with Google
                </GoogleButton>
              </Col>
            </Row>
          )}
        </Space>
      </Container> */}
    </Layout>
  )
};

export default SignIn;