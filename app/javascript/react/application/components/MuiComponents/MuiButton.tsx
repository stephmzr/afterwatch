import { Button, ButtonProps } from '@material-tailwind/react';
import React from 'react';

const MuiButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button {...props} ref={undefined}>
      {props.children}
    </Button>
  );
}

export default MuiButton;