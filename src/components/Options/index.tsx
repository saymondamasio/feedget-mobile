import React from 'react'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Copyright } from '../Copyright'
import { Option } from '../Option'
import { FeedbackType } from '../Widget'

import { Container, ContainerOptions, Title } from './styles'

interface Props {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void
}

export function Options({ onFeedbackTypeChanged }: Props) {
  return (
    <Container>
      <Title>Deixe seu feedback</Title>

      <ContainerOptions>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
          />
        ))}
      </ContainerOptions>
      <Copyright />
    </Container>
  )
}
