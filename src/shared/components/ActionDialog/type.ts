import { ReactNode } from 'react'

export interface IActionDialog {
  open: boolean
  handleClose: () => void
  actionBtnClickHandler: (e: any) => void
  dialogTitle: string
  actionButtonText: string
  children: ReactNode
  actionButtonDisabled?: boolean
  actionResultMsg?: string
  actionBtnColor:
    | 'error'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
}
