import { Box } from '@mui/material'
import SportForm from './SportsForm'

const SpotCreate = () => {
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Box>
      <SportForm
        defaultValues={{ spotName: '', spotOption: '' }}
        onSubmit={onSubmit}
      />
    </Box>
  )
}

export default SpotCreate
