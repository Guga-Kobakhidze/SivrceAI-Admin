import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <Box
      gap={2}
      maxWidth={280}
      display="flex"
      margin="0 auto"
      height="100dvh"
      textAlign="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography variant="h4">Page Not Found</Typography>
      <Button onClick={() => navigate(-1)} variant="outlined" color="secondary">
        Go Back
      </Button>
    </Box>
  )
}

export default PageNotFound
