import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const MuiSearchInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      {...props}
    >
      {props.children}
    </TextField>
  );
}

export default MuiSearchInput;