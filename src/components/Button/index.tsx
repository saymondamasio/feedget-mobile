import React from 'react'
import { ActivityIndicator, TouchableOpacityProps } from 'react-native'
import { theme } from '../../theme'

import { Container, Title } from './styles'

interface Props extends TouchableOpacityProps {
  isLoading?: boolean
}

export function Button({ isLoading, ...rest }: Props) {
  return (
    <Container {...rest}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Title>Enviar feedback</Title>
      )}
    </Container>
  )
}
