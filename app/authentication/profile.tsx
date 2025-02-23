import { StyleSheet, View } from 'react-native'
import React from 'react'
import SignUpScreen from '@/components/Profile/RegisterScreen'
import AccountScreen from '@/components/Profile/ProfileScreen'

export default function Profile() {
  return (
    <View style={styles.container}>
        <AccountScreen/>
    </View>
  )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
      },
})
