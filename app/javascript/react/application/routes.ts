import InternalServerError from '../shared/components/Errors/InternalServerError'
import NotFound from '../shared/components/Errors/NotFound'
import Cast from './pages/Cast/Cast'
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
    component: MediaShow as () => JSX.Element,
    hideInMenu: true
  },
  {
    path: '/medias/:type/:id/cast',
    name: 'cast',
    component: Cast,
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
  },
  {
    path: '/movies',
    name: 'movies',
    component: HomePage
  },
  {
    path: '/tv',
    name: 'tv',
    component: HomePage
  }
]

export default routes
