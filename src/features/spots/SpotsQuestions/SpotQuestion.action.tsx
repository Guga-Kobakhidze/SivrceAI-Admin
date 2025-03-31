import { ROUTES } from '@constants'
import { AddIcon } from '@icons'
import { Box } from '@mui/material'
import Actions from '@widgets/Actions'

const SpotQuestionsAction = () => {
  return (
    <Box width="100%">
      <Actions
        toolbars={[
          {
            to: ROUTES.createSpotQuestion,
            title: 'Create question',
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

export default SpotQuestionsAction
