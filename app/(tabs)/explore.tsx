import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

export default function Explore() {
  return (
    <View style={styles.container}>
        <Text>Cooming Soon!</Text>
    </View>
  )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
      },
})
