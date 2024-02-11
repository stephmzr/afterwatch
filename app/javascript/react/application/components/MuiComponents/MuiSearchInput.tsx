import { TextField, TextFieldProps, alpha, styled } from "@mui/material";
import React from "react";

const MuiSearchInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      {...props}
    >
      {props.children}
    </TextField>
  );
}

export default MuiSearchInput;