import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { type UserType } from '../../../types'
import post from '../../../../utils/httpPost'
import useI18n from '@/utils/useI18n'

import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Box, TextField, ThemeProvider, createTheme } from '@mui/material'
import MuiButton from '../../../application/components/MuiComponents/MuiButton'

const Layout = styled.div`
  display: block;
  text-align: center;
  height: 100vh;
  background-color: #FFFFFF;
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
`

interface SignInProps {
  user: UserType
  errors: any
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#7D7D7D'
    },
    secondary: {
      main: '#FFFFFF'
    }
  }
})

const SignIn: React.FC<SignInProps> = props => {
  const {
    user
  } = props
  const { t } = useI18n()


  // Définir l'état local pour les valeurs du formulaire
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  // Gérer les changements de valeur des champs du formulaire
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.id]: event.target.value
    })
  }

  console.log(formValues)
  const signInUser = (user: UserType) => {
    post('/users/sign_in', {
      ...formValues
    }, 'user')
  }
  const history = useNavigate()

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    signInUser(formValues) // Utiliser formValues au lieu de user
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Container>
          <LogoContainer>
            {/* <img src={logo} /> */}
          </LogoContainer>
          <Box
            component="form"
            sx={{ m: 2, p: 2, border: '1px solid #000000', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit} // Ajouter un gestionnaire d'événement onSubmit
          >
            <TextField
              required
              id="email"
              label="Email"
              value={formValues.email} // Utiliser la valeur de l'état local
              onChange={handleInputChange} // Ajouter un gestionnaire d'événement onChange
            />
            <TextField
              required
              id="password"
              type='password'
              label="Password"
              value={formValues.password} // Utiliser la valeur de l'état local
              onChange={handleInputChange} // Ajouter un gestionnaire d'événement onChange
            />
            <MuiButton
              type="submit"
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Submit
            </MuiButton>
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  )
}

export default SignIn
