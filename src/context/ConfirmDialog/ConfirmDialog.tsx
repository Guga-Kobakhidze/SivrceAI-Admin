import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { ActionDialog } from '@components'
import { IActionDialog } from 'src/shared/components/ActionDialog/type'

interface IConfirmDialog {
  title?: string
  description?: string
  cancelLabel?: string
  confirmLabel?: string
  onSuccess: () => void | Promise<void>
  buttonType?: IActionDialog['actionBtnColor']
}

interface IConfirmDialogContext {
  showConfirmDialog: (confirmParams: IConfirmDialog) => void
}

const initialState = {
  title: '',
  description: '',
  onSuccess: () =>
    new Promise<void>(resolve => {
      resolve()
    }),
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
}

const reducer = (state: IConfirmDialog, actions: Partial<IConfirmDialog>) => ({
  ...state,
  ...actions,
})

const ConfirmDialogContext = createContext({})

const ConfirmDialogContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [dialogData, setDialogData] = useReducer(reducer, initialState)

  const showConfirmDialog = useCallback(
    ({
      confirmLabel,
      cancelLabel,
      buttonType,
      title,
      onSuccess,
      description,
    }: IConfirmDialog) => {
      setShowDialog(true)
      const finalParams: Partial<IConfirmDialog> = {}
      if (confirmLabel) finalParams.confirmLabel = confirmLabel
      if (cancelLabel) finalParams.cancelLabel = cancelLabel
      setDialogData({
        ...finalParams,
        title,
        buttonType,
        onSuccess,
        description,
      })
    },
    [],
  )

  const reset = useCallback(() => {
    setDialogData(initialState)
  }, [])

  const close = useCallback(() => {
    setShowDialog(false)
    reset()
  }, [reset])

  const confirm = useCallback(() => {
    dialogData.onSuccess()
    close()
  }, [dialogData, close])

  const values = useMemo(
    () => ({
      showConfirmDialog,
    }),
    [showConfirmDialog],
  )

  return (
    <ConfirmDialogContext.Provider value={values}>
      {children}
      <ActionDialog
        open={showDialog}
        handleClose={close}
        actionBtnClickHandler={confirm}
        dialogTitle={dialogData.title ?? ''}
        actionButtonText={dialogData.confirmLabel ?? ''}
        actionBtnColor={dialogData.buttonType ?? 'error'}
      >
        {dialogData.description}
      </ActionDialog>
    </ConfirmDialogContext.Provider>
  )
}

export const useConfirmDialog = () =>
  useContext(ConfirmDialogContext) as IConfirmDialogContext

export default ConfirmDialogContextProvider
