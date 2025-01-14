import {
  Box,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  Modal,
} from '@mui/material'
import { IActionDialog } from './type'
import { smoothAppear, style } from './style'

function ActionDialog({
  open,
  children,
  handleClose,
  dialogTitle,
  actionResultMsg,
  actionButtonText,
  actionButtonDisabled,
  actionBtnClickHandler,
  actionBtnColor = 'success',
}: IActionDialog) {
  return (
    <Modal onClose={handleClose} open={open}>
      <Box
        sx={{
          ...style,
          animation: open ? `${smoothAppear} 0.5s ease-out` : '',
        }}
      >
        <DialogTitle alignItems="center">{dialogTitle}</DialogTitle>
        {actionResultMsg && (
          <Typography
            variant="caption"
            fontWeight="medium"
            sx={{ color: '#000' }}
            m="8px 0 0 8px"
          >
            {actionResultMsg}
          </Typography>
        )}
        <DialogContent>{children}</DialogContent>
        <Box my={2} display="flex" justifyContent="center" gap={2}>
          <Button
            disabled={actionButtonDisabled}
            onClick={actionBtnClickHandler}
            color={actionBtnColor}
            variant="outlined"
          >
            {actionButtonText}
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ActionDialog
