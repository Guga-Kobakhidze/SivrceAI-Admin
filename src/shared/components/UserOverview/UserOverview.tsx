import { Box, Grid2, Typography, useTheme } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

interface UserOverViewProps {
  title: string
  activity: number
  precent: number
}

const UserOverview = ({ precent, title, activity }: UserOverViewProps) => {
  const { palette } = useTheme()
  return (
    <Grid2
      p={3}
      borderRadius={2}
      bgcolor={palette.text.primary}
      fontWeight={700}
      size={{ xs: 12, md: 6, xl: 3 }}
    >
      <Typography fontSize={14} color="#fafafa" mb={1}>
        {title}
      </Typography>
      <Box
        gap="14px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontSize={32} fontWeight={700} color="#fafafa">
          {activity}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} color="#fafafa">
          <Typography>{precent}%</Typography>
          {precent > 50 ? <TrendingUpIcon /> : <TrendingDownIcon />}
        </Box>
      </Box>
    </Grid2>
  )
}

export default UserOverview
