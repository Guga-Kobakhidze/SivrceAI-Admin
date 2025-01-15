import Actions from '@widgets/Actions'
import { Box } from '@mui/material'
import { DownloadIcon } from '@icons'

const Interier = () => {
  return (
    <Box>
      <Actions
        title="Interier Design"
        toolbars={[
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

export default Interier
