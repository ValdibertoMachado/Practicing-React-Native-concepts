import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, } from 'react-native';
import React from 'react';
import {Main} from './src/screens/Main';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="auto" />
    <Main/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  
  
});
