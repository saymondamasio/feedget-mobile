import React from 'react'

import successIcon from '../../assets/success.png'
import { Copyright } from '../Copyright'

import {
  Container,
  ImageSuccess,
  Title,
  SendButton,
  SendButtonText,
} from './styles'

interface Props {
  onSendAnotherFeedback: () => void
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <Container>
      <ImageSuccess source={successIcon} />

      <Title>Agradecemos o feedback!</Title>

      <SendButton onPress={onSendAnotherFeedback}>
        <SendButtonText>Quero enviar outro</SendButtonText>
      </SendButton>

      <Copyright />
    </Container>
  )
}
