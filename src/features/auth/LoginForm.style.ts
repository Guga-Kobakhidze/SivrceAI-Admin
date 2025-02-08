export const textFieldStyles = {
  slotProps: {
    inputLabel: {
      shrink: true,
      sx: { color: 'white', '&.Mui-focused': { color: 'white' } },
    },
  },
  sx: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': { borderColor: 'white' },
    },
    input: { color: 'white' },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #27262C inset',
      WebkitTextFillColor: 'white',
      caretColor: 'transparent',
    },
  },
}
