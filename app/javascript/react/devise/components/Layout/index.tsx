// @ts-nocheck
import React from 'react';
import { Layout as AntdLayout } from 'antd';
import styles from './index.module.sass';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles)

const {
  Content,
  Footer
} = AntdLayout;

interface IProps {
  children: React.ReactNode;
  user: any;
};

const Layout: React.FC<IProps> = props => {
  const {
    children,
  } = props;
  
  return (
    <AntdLayout>
      <Content className={styles.contentWrapper} style={{ padding: 0 }}>
        {children}
      </Content>
      <Footer className="layout-footer" />
    </AntdLayout>
  );
};

export default Layout;
