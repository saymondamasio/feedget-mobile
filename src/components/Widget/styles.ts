import { getBottomSpace } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'
import { theme } from '../../theme'
import BottomSheet from '@gorhom/bottom-sheet'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Button = styled.TouchableOpacity`
  width: 48px;
  height: 48px;

  border-radius: 24px;
  background-color: ${theme.colors.brand};
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 16px;
  bottom: ${getBottomSpace() + 16}px;
`

export const FooterBottomSheet = styled(BottomSheet).attrs({
  handleIndicatorStyle: {
    backgroundColor: theme.colors.text_primary,
    width: 56,
  },
  backgroundStyle: {
    backgroundColor: theme.colors.surface_primary,
    paddingBottom: getBottomSpace() + 16,
  },
})``
