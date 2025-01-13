import React from 'react'
import { PageHeaderToolbar } from '@toolpad/core/PageContainer'
import { Box, Button, Grid2, Link, Stack, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { RightArrowIcon } from '@icons'

const StyledLink = styled(Link)({
  fontSize: 22,
  color: 'black',
})

interface CustomPageToolbarProps {
  variant: 'text' | 'outlined' | 'contained'
  color: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  icon: React.ReactNode
  title: string
  to?: string
  action?: () => void
  type?: 'button' | 'submit'
  hidden?: boolean
}

interface ActionsProps {
  title: string
  subtitle?: string
  toolbars: CustomPageToolbarProps[]
}

const Actions = ({ toolbars, title, subtitle }: ActionsProps) => {
  const navigate = useNavigate()

  return (
    <Grid2 container alignItems="center" mb={4}>
      <Box display="flex" textAlign="center">
        {subtitle && (
          <React.Fragment>
            <StyledLink
              sx={{ cursor: 'pointer' }}
              underline="hover"
              onClick={() => navigate(-1)}
            >
              {subtitle}
            </StyledLink>
            <RightArrowIcon />
          </React.Fragment>
        )}
        <StyledLink underline="none" sx={{ opacity: 0.7 }}>
          {title}
        </StyledLink>
      </Box>

      <PageHeaderToolbar>
        <Stack direction="row" spacing={1} alignItems="center">
          {toolbars.map((toolbar, index) => {
            if (toolbar.hidden) return

            const onClick = () => {
              if (toolbar.to) navigate(toolbar.to)
              if (toolbar.action) toolbar.action()
            }

            return (
              <Button
                key={index}
                size="small"
                onClick={onClick}
                sx={{ py: 1, px: 2 }}
                color={toolbar.color}
                startIcon={toolbar.icon}
                variant={toolbar.variant}
                type={toolbar.type ?? 'button'}
              >
                {toolbar.title}
              </Button>
            )
          })}
        </Stack>
      </PageHeaderToolbar>
    </Grid2>
  )
}
export default Actions
