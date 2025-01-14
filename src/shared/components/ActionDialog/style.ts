import { keyframes } from '@emotion/react'

export const smoothAppear = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  `

export const style = {
  position: 'absolute',
  borderRadius: '10px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  textAlign: 'center',
}
