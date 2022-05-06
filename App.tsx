import { View } from 'react-native'
import { Widget } from './src/components/Widget'

import * as Font from 'expo-font'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { theme } from './src/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()

        await Font.loadAsync({
          Inter_400Regular,
          Inter_500Medium,
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        onLayout={onLayoutRootView}
      >
        <Widget />

        <StatusBar style="light" backgroundColor="transparent" translucent />
      </View>
    </GestureHandlerRootView>
  )
}
