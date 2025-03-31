import { ROUTES } from '@constants'
import { AddIcon } from '@icons'
import { Box } from '@mui/material'
import Actions from '@widgets/Actions'

const SpotsActions = () => {
  return (
    <Box width="100%">
      <Actions
        toolbars={[
          {
            to: ROUTES.createSpot,
            title: 'Create Spot',
            color: 'primary',
            icon: <AddIcon />,
            variant: 'contained',
          },
          // {
          //   title: 'Export',
          //   color: 'success',
          //   icon: <DownloadIcon />,
          //   variant: 'contained',
          // },
        ]}
      />
    </Box>
  )
}

export default SpotsActions
