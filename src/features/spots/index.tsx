import { ROUTES } from '@constants'
import { AddIcon, DownloadIcon } from '@icons'
import { Box } from '@mui/material'
import Actions from '@widgets/Actions'
import SpotsTable from './SpotsTable'

const Spots = () => {
  return (
    <Box>
      <Actions
        title="Spots"
        toolbars={[
          {
            to: ROUTES.createSpot,
            title: 'Create Spot',
            color: 'primary',
            icon: <AddIcon />,
            variant: 'contained',
          },
          {
            title: 'Export',
            color: 'success',
            icon: <DownloadIcon />,
            variant: 'contained',
          },
        ]}
      />
      <SpotsTable />
    </Box>
  )
}

export default Spots
