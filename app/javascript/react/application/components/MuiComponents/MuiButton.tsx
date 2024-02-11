import { Button, ButtonProps } from '@mui/material';
import React from 'react';

const MuiButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button color="primary" variant="contained" {...props}>
      {props.children}
    </Button>
  );
}

export default MuiButton;