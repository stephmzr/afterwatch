import React from 'react';
import { Spin, SpinProps } from 'antd';

type LoaderProps = {
  loading?: boolean;
} & SpinProps;

const Loader: React.FC<LoaderProps> = ({
  loading = false,
  children,
  ...rest
}) => (
  <Spin
    spinning={loading}
    {...rest}
  >
    {children}
  </Spin>
);

export default Loader;
