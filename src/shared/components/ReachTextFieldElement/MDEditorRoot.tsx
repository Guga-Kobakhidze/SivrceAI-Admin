/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { styled } from '@mui/material/styles'

export default styled('div')(() => {
  return {
    '& .rdw-editor-wrapper': {
      border: `1px solid lightgray`,
      borderRadius: '5px',
      backgroundColor: 'transparent',

      '&:hover': { borderColor: '#000' },
    },

    '& .rdw-editor-toolbar': {
      border: 0,
      borderBottom: `1px solid lightgray`,
      borderRadius: '5px',
      backgroundColor: 'transparent',
    },

    '& .rdw-option-wrapper, & .rdw-dropdown-wrapper': {
      borderColor: 'lightgray',
      backgroundColor: '#fff',

      '&:hover': {
        boxShadow: 'none',
        borderColor: '#000',
      },
    },

    '& .rdw-option-active': {
      boxShadow: 'none',
      borderColor: 'lightgray',
    },

    '& .public-DraftStyleDefault-block': {
      margin: 0,
      padding: '8px',
    },
  }
})
