import { ROUTES } from '@constants'
import { AddIcon, DownloadIcon } from '@icons'
import { Box } from '@mui/material'
import Actions from '@widgets/Actions'

const InteriorQuestionAction = () => {
  return (
    <Box width="100%">
      <Actions
        toolbars={[
          {
            to: ROUTES.createInteriorQuestion,
            title: 'create question',
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
    </Box>
  )
}

export default InteriorQuestionAction
