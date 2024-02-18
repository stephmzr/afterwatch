import React from 'react'
import Autocomplete, { type AutocompleteProps } from '@mui/material/Autocomplete'

const MuiAutoComplete: React.FC<AutocompleteProps<any, boolean, boolean, boolean, any>> = (props) => {
  return (
    <Autocomplete
      {...props}
    />
  )
}

export default MuiAutoComplete
