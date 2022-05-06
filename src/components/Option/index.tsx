import React from 'react'
import { ImageProps, TouchableOpacityProps } from 'react-native'

import { Container, ImageOption, Title } from './styles'

interface Props extends TouchableOpacityProps {
  title: string
  image: ImageProps
}

export function Option({ image, title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
      <ImageOption source={image} />
    </Container>
  )
}
