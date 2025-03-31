import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIcon } from '@icons'
import { PageHeaderToolbar } from '@toolpad/core/PageContainer'
import { Button, Grid2, Link, Stack, styled } from '@mui/material'

const StyledLink = styled(Link)({
  fontSize: 22,
  color: 'black',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
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
  disabled?: boolean
  loadText?: string
}

interface ActionsProps {
  title?: string
  toolbars: CustomPageToolbarProps[]
  isNavigate?: boolean
}

const Actions = ({ toolbars, title, isNavigate = false }: ActionsProps) => {
  const navigate = useNavigate()

  return (
    <Grid2 container alignItems="center">
      {Boolean(title) && (
        <React.Fragment>
          <StyledLink
            underline={isNavigate ? 'hover' : 'none'}
            sx={{ cursor: isNavigate ? 'pointer' : 'default' }}
            onClick={isNavigate ? () => navigate(-1) : undefined}
          >
            {isNavigate && <ArrowBackIcon />}
            {title}
          </StyledLink>
        </React.Fragment>
      )}

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
                disabled={toolbar.disabled}
                type={toolbar.type ?? 'button'}
              >
                {toolbar.disabled ? toolbar.loadText : toolbar.title}
              </Button>
            )
          })}
        </Stack>
      </PageHeaderToolbar>
    </Grid2>
  )
}
export default Actions
