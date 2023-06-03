import React from 'react'
import Toast from 'react-native-toast-message'

type IProps = {
  message: string
  title?: string
  type?: 'success' | 'error'
}
const ShowToast = ({ message, title, type = 'success' }: IProps) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    position: 'bottom',
  })
}

export default ShowToast
