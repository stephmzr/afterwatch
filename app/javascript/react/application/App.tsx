import React from 'react'
import AppLayout from './components/Layout/Layout'
import TranslationProvider from '../../utils/TranslationProvider'
import AppProvider from '../shared/components/AppProvider'
import routes from './routes'
import '../../assets/stylesheets/global.sass'
import './assets/stylesheets/global.sass'
import flattenRoutes from '../../utils/flattenRoutes'
import { Route, Routes } from 'react-router-dom'
import { type UserType } from '../types'

interface IProps {
  user: UserType
}

const App: React.FC<IProps> = (props) => {
  return (
    <AppProvider {...props}>
      <AppLayout user={props.user}>
        <Routes>
          {flattenRoutes(routes).filter(route => !route.access).map(route => {
            const Component = route.component
            return (
              <Route key={route.name} path={route.path} element={<Component />}/>
            )
          })}
        </Routes>
      </AppLayout>
    </AppProvider>
  )
}

export default TranslationProvider(App)
