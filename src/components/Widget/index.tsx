import { ChatTeardropDots } from 'phosphor-react-native'
import React, { useRef, useState } from 'react'
import { theme } from '../../theme'
import BottomSheet from '@gorhom/bottom-sheet'

import { Container, Button, FooterBottomSheet } from './styles'
import { Options } from '../Options'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Form } from '../Form'
import { Success } from '../Success'

export type FeedbackType = keyof typeof feedbackTypes

export function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  function handleRestartFeedback() {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  function handleFeedbackSent() {
    setFeedbackSent(true)
  }

  return (
    <Container>
      <Button onPress={handleOpen}>
        <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} />
      </Button>
      <FooterBottomSheet ref={bottomSheetRef} snapPoints={[1, 280]}>
        {feedbackSent ? (
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={handleFeedbackSent}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            )}
          </>
        )}
      </FooterBottomSheet>
    </Container>
  )
}
