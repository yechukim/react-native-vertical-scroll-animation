
import React from 'react'
import { FlatList, StyleSheet, View, Text, SafeAreaView, Animated } from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const CARD_HEIGHT = 300

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    color: 'pink'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    color: 'yellow'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    color: 'white'
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

function App() {
  const { width, height } = useWindowDimensions()
  const y = new Animated.Value(0)
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ddd' }}>
      <AnimatedFlatList
        decelerationRate={'fast'}
        snapToInterval={height}
        // snapToOffsets
        snapToAlignment={'start'}
        scrollsToTop={true}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        scrollEventThrottle={16}
        bounces={false}
        data={DATA}
        renderItem={({ index, item }) => (
          <Card {...{ index, y, item }} />
        )
        }
        keyExtractor={item => item.id}
        {...{ onScroll }}
      />

    </SafeAreaView>

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
      style={{
        backgroundColor: item.color,
        width: 350,

        height: height,
        transform: [{ translateY }, { scale }],
        opacity,
      }} >
      <Text style={styles.text}>{item.title}</Text>
    </Animated.View>
  )
}
const styles = StyleSheet.create({

  text: {
    fontSize: 24,
  }

})


export default App;