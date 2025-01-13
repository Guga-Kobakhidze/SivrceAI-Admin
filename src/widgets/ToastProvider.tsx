import IconButton from '@mui/material/IconButton'
import { CloseIcon } from '@icons'
import { Zoom, ToastContainer as OriginalToastContainer } from 'react-toastify'

const ToastCloseButton = ({ closeToast }: any) => {
  return (
    <IconButton size="small" color="inherit" onClick={closeToast}>
      <CloseIcon />
    </IconButton>
  )
}

const ToastProvider = () => {
  return (
    <OriginalToastContainer
      position="bottom-right"
      newestOnTop={true}
      closeOnClick={false}
      autoClose={2000}
      hideProgressBar={true}
      draggable={false}
      closeButton={ToastCloseButton}
      theme="dark"
      transition={Zoom}
      toastStyle={{
        backgroundColor: 'rgb(50, 50, 50)',
      }}
    />
  )
}
export default ToastProvider
