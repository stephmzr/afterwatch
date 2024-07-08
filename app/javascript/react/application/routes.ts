import InternalServerError from '../shared/components/Errors/InternalServerError'
import NotFound from '../shared/components/Errors/NotFound'
import HomePage from './pages/HomePage/HomePage'
import MediaShow from './pages/Media/MediaShow'

interface Route {
  path: string
  name: string
  key?: string
  icon?: any
  component?: () => JSX.Element
  hideInMenu?: boolean
  children?: Route[]
}

const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    hideInMenu: true
  },
  {
    path: '/medias/:type/:id',
    name: 'medias',
    component: MediaShow,
    hideInMenu: true
  },
  {
    path: '/404',
    name: 'not_found',
    hideInMenu: true,
    component: NotFound
  },
  {
    path: '/500',
    name: 'not_found',
    hideInMenu: true,
    component: InternalServerError
  }
]

export default routes
