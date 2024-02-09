import React from 'react';
import { Layout as AntdLayout, Menu } from 'antd';
import styles from './index.module.sass';
import RightMenu from "../../../shared/components/RightMenu";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useIntl } from "react-intl";
import routes from "../../routes";
import SVG from 'react-inlinesvg';
import { urlToList } from '../../../../utils/_utils';
import { USER_FRAGMENT } from '../../../../utils/fragments';
import { gql, useQuery } from '@apollo/client';
import { UserType } from '../../../types';
import flattenRoutes from '../../../../utils/flattenRoutes';
import { hasRoles } from '../../../../utils/authorization';
import { UserProvider } from '../../../../utils/providers/UserProvider';

const {
  Header,
  Content,
  Footer
} = AntdLayout;

const GET_PROFILE_QUERY = gql`
  query profile {
    profile {
      ...UserInfo
    }
  }
  ${USER_FRAGMENT}
`;

/*
 * Layout component
 */

type LayoutProps = {}

const Layout: React.FC<LayoutProps> = () => {

  /*
   * Hooks
   */

  const intl = useIntl()
  const location = useLocation()
  const history = useNavigate()

  const { data, refetch } = useQuery(GET_PROFILE_QUERY)
  const user: UserType = data?.profile || {}

  const onRouteChange = (key) => history(key)
  const pathname = location.pathname;
  const activeKeys = urlToList(pathname)
  
  const rts = flattenRoutes(routes).filter(r => r.component).filter(route => route.access ? hasRoles(user, route.access) : true)

  /*
   * Render
   */

  return (
    <AntdLayout>
      <UserProvider
        user={user}
        refetch={refetch}
      >
        <Header className={styles.header}>
          <div className={styles.headerLeft}>
            <div>
              { 'MyApplication' }
            </div>
            <Menu
              selectedKeys={activeKeys}
              className={styles.menu}
              style={{ backgroundColor: '#FFF' }}
              theme="light"
              mode="horizontal"
            >
              { routes.filter(route => !route.hideInMenu && (route.access ? hasRoles(user, route.access) : true)).map(route => {
                // @ts-ignore
                const childrenRoutes = (route.children || []).filter(route => !route.hideInMenu).filter(route => !route.access || hasRoles(user, route.access))
                if (childrenRoutes?.length > 1) {
                  return (
                    <Menu.SubMenu key={route.path} title={intl.formatMessage({ id: `menu.${route.name}`})}>
                      { childrenRoutes.map(route => (
                        <Menu.Item
                          key={route.path || route.key}
                          onClick={() => onRouteChange(route.path)}
                        >
                          { intl.formatMessage({ id: `menu.${route.name}`}) }
                        </Menu.Item>
                      )) }
                    </Menu.SubMenu>
                  )
                }
                return (
                  <Menu.Item
                    key={route.path}
                    onClick={() => onRouteChange(childrenRoutes.length > 0 ? childrenRoutes[0].path : route.path)}
                    icon={route.icon ? <span className='menu-icon'><SVG src={route.icon} /></span> : undefined}
                  >
                    { intl.formatMessage({ id: `menu.${childrenRoutes.length > 0 ? childrenRoutes[0].name : route.name}`}) }
                  </Menu.Item>
                );
              }) }
            </Menu>
          </div>
          <div>
            <RightMenu 
              logoutUrl='/users/sign_out'
              theme="light"
            />
          </div>
        </Header>
        <Content className={styles.contentWrapper}>
          <Routes>
            { rts.map(route => {
              const Component = route.component;
              return (
                <Route
                  key={route.name}
                  exact
                  path={route.path}
                  element={
                    <Component />
                  }
                />
              )
            }) }
          </Routes>
        </Content>
      </UserProvider>
    </AntdLayout>
  )
};

export default Layout;
