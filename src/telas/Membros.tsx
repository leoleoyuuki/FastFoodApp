import React from 'react'
import { ImageBackground, StyleSheet, TextInput, View } from 'react-native';
import Header from './Header';
import { Text } from '@rneui/base';
export default function Membros() {
    return (
        <ImageBackground source={require("../../assets/backgroundimg.jpg")} style={styles.backgroundImage}>
          <Header />
          <View style={styles.container}>
            <Text>Rm550373 - Leonardo Yuuki Nakazone</Text>
            <Text>Rm552184 - Daniel Soares Delfin</Text>
          </View>
        </ImageBackground>
      );
    };
    
    const styles = StyleSheet.create({
      backgroundImage: {
        flex: 1,
        resizeMode: "cover",
      },
      container: {
        padding: 12,
      },
    });
    

