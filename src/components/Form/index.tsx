import { ArrowLeft } from 'phosphor-react-native'
import React, { useState } from 'react'
import { theme } from '../../theme'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Button } from '../Button'
import { ScreenshotButton } from '../ScreenshotButton'
import { FeedbackType } from '../Widget'
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'

import {
  Container,
  Header,
  BackButton,
  Content,
  Title,
  ImageFeedback,
  InputFeedback,
  Footer,
} from './styles'
import { api } from '../../libs/api'

interface Props {
  feedbackType: FeedbackType
  onFeedbackCanceled: () => void
  onFeedbackSent: () => void
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [isTakingShot, setIsTakingShot] = useState(false)
  const [isSendFeedback, setIsSendFeedback] = useState(false)
  const [comment, setComment] = useState('')

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleScreenshot() {
    try {
      const screenshotUri = await captureScreen({
        format: 'jpg',
        quality: 0.8,
      })

      setScreenshot(screenshotUri)
    } catch (error) {
      console.log(error)
    }
  }

  function handleRemoveScreenshot() {
    setScreenshot(null)
  }

  async function handleSendFeedback() {
    if (isSendFeedback) return

    setIsSendFeedback(true)
    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }))

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment,
      })

      onFeedbackSent()
    } catch (error) {
      console.log(error)
      setIsSendFeedback(false)
    }
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </BackButton>

        <Content>
          <ImageFeedback source={feedbackTypeInfo.image} />
          <Title>{feedbackTypeInfo.title}</Title>
        </Content>
      </Header>

      <InputFeedback
        onChangeText={setComment}
        textAlignVertical="top"
        multiline
        autoCorrect={false}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <Footer>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleRemoveScreenshot}
          screenshot={screenshot}
          loading={isTakingShot}
        />

        <Button onPress={handleSendFeedback} isLoading={isSendFeedback} />
      </Footer>
    </Container>
  )
}
