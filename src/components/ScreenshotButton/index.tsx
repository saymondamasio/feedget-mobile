import { Camera, Trash } from 'phosphor-react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { theme } from '../../theme'

import { Container, Icon, ScreenshotImage } from './styles'

interface Props {
  screenshot: string | null
  onTakeShot: () => void
  onRemoveShot: () => void
  loading?: boolean
}

export function ScreenshotButton({
  onRemoveShot,
  onTakeShot,
  screenshot,
  loading = false,
}: Props) {
  return (
    <Container onPress={screenshot ? onRemoveShot : onTakeShot}>
      {loading ? (
        <ActivityIndicator color={theme.colors.brand} />
      ) : (
        <>
          {screenshot ? (
            <>
              <ScreenshotImage source={{ uri: screenshot }} />
              <Icon>
                <Trash
                  size={22}
                  color={theme.colors.text_secondary}
                  weight="fill"
                />
              </Icon>
            </>
          ) : (
            <Camera
              size={24}
              color={theme.colors.text_secondary}
              weight="bold"
            />
          )}
        </>
      )}
    </Container>
  )
}
