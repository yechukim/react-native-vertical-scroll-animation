import React from 'react'
import { FlatList, StyleSheet, Text, Animated, Image } from 'react-native';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import 'react-native-get-random-values'
import { v4 as uuid4 } from 'uuid';

const data = Array.from({ length: 10 })
  .map((_, index) => ({
    id: uuid4()
  }))

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

function App() {
  const { width, height } = useWindowDimensions()
  const y = new Animated.Value(0)
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#fff' }}>
        <AnimatedFlatList
          decelerationRate={'fast'}
          snapToInterval={height} // stops when figner lifts ? i guess 
          // snapToOffsets
          snapToAlignment={'start'}
          scrollsToTop={true}
          scrollEventThrottle={16}
          bounces={false}
          data={data}
          renderItem={({ index, item }) => (
            <Card {...{ index, y, item }} />
          )
          }
          keyExtractor={item => item.id}
          {...{ onScroll }}
        />

      </SafeAreaView>
    </SafeAreaProvider >

  );
}

const Card = ({ index, y, item }) => {
  const { width, height } = useWindowDimensions()
  const position = Animated.subtract(index * height, y)

  const isDisappearing = -height
  const isTop = 0
  const isBottom = 0
  const isAppearing = height

  translateY = Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.0001 + index * height],
      outputRange: [0, -index * height],
      extrapolate: 'clamp'
    }))

  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.8, 1, 1, 0.9],
    extrapolate: 'clamp'
  })

  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp'
  })
  return (
    <Animated.View
      style={[styles.block, {
        transform: [{ translateY }, { scale }],
        opacity,
        height: height,
        width: width
      }]}>
      <Image
        resizeMode='cover'
        style={{ flex: 1 }}
        source={{ uri: `https://picsum.photos/${width}/${height}` }}
      />
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  block: {
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 24,
  }
})


export default App;